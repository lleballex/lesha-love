import { Column, Entity, ManyToOne, OneToMany, RelationCount } from 'typeorm'

import { Response } from '@/responses/entities/response.entity'
import { BaseEntity } from '@/core/entities/base-entity'
import { Scope } from '@/scopes/entities/scope.entity'
import { Recruiter } from '@/users/entities/recruiter.entity'

export enum VacancyStatus {
  Active = 'active',
  Closed = 'closed',
}

export enum VacancyWorkExperience {
  NoExperience = 'no_experience',
  UpTo3 = 'up_to_3',
  UpTo6 = 'up_to_6',
  From6 = 'from_6',
}

export enum VacancyWorkSchedule {
  NoSchedule = 'no_schedule',
  FiveToTwo = '5_2',
  TwoToTwo = '2_2',
  ThreeToThree = '3_3',
}

export enum VacancyWorkFormat {
  OnSite = 'on_site',
  Remote = 'remote',
  Hybrid = 'hybrid',
}

@Entity()
export class Vacancy extends BaseEntity {
  @Column('varchar')
  title: string

  @Column('text')
  description: string

  @Column('text', { nullable: true })
  responsibilities: string | null

  @Column('text', { nullable: true })
  conditions: string | null

  @Column('text', { nullable: true })
  requirements: string | null

  @Column({ enum: VacancyStatus, default: VacancyStatus.Active })
  status: VacancyStatus

  @Column({ enum: VacancyWorkExperience })
  workExperience: VacancyWorkExperience

  @Column({ enum: VacancyWorkSchedule })
  workSchedule: VacancyWorkSchedule

  @Column({ enum: VacancyWorkFormat })
  workFormat: VacancyWorkFormat

  @Column('int', { nullable: true })
  salaryFrom: number | null

  @Column('int', { nullable: true })
  salaryTo: number | null

  // TODO: replace with something
  @RelationCount('responses')
  responsesCount: number

  @ManyToOne(() => Scope, (scope) => scope.vacancies, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  scope?: Scope

  @ManyToOne(() => Recruiter, (recruiter) => recruiter.vacancies, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  recruiter?: Recruiter

  @OneToMany(() => Response, (response) => response.vacancy)
  responses?: Response[]
}
