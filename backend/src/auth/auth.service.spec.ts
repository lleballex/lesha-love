import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { ConflictException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { UsersService } from '@/users/users.service'
import { User, UserRole } from '@/users/entities/user.entity'

import { AuthService } from './auth.service'

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}))

describe('AuthService', () => {
  let authService: AuthService
  let usersService: Partial<jest.Mocked<UsersService>>
  let jwtService: Partial<jest.Mocked<JwtService>>

  const userMock: User = {
    id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    role: UserRole.Recruiter,
    email: '',
    password: '',
  }

  beforeEach(async () => {
    usersService = {
      findOneForAuth: jest.fn(),
      create: jest.fn(),
    }

    jwtService = {
      signAsync: jest.fn(),
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile()

    authService = module.get(AuthService)
  })

  describe('login', () => {
    it('should return null if user not found', async () => {
      usersService.findOneForAuth?.mockResolvedValue(null)

      const result = await authService.login({ email: '', password: '' })
      expect(result).toBeNull()
    })

    it('should return null if password is invalid', async () => {
      usersService.findOneForAuth?.mockResolvedValue(userMock)
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

      const result = await authService.login({ email: '', password: '' })
      expect(result).toBeNull()
    })

    it('should return a token on success', async () => {
      usersService.findOneForAuth?.mockResolvedValue(userMock)
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
      jwtService.signAsync?.mockResolvedValue('token')

      const result = await authService.login({ email: '', password: '' })
      expect(result).toEqual({ token: 'token' })
    })
  })

  describe('register', () => {
    it('should throw ConflicException if user with this email already exists', async () => {
      usersService.findOneForAuth?.mockResolvedValue(userMock)

      await expect(
        authService.register({
          email: '',
          password: '',
          role: UserRole.Recruiter,
        }),
      ).rejects.toThrow(ConflictException)
    })

    it('should create user and return token on success', async () => {
      usersService.findOneForAuth?.mockResolvedValue(null)
      ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password')
      usersService.create?.mockResolvedValue(userMock)
      jwtService.signAsync?.mockResolvedValue('token')

      const result = await authService.register({
        email: 'test@test.test',
        password: 'test-password',
        role: UserRole.Recruiter,
      })

      expect(usersService.create).toHaveBeenCalledWith({
        email: 'test@test.test',
        password: 'hashed-password',
        role: UserRole.Recruiter,
      })
      expect(result).toEqual({ token: 'token' })
    })
  })
})
