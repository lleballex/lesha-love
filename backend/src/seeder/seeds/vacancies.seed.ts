import { Scope } from '@/scopes/entities/scope.entity'
import { Recruiter } from '@/users/entities/recruiter.entity'
import {
  Vacancy,
  VacancyStatus,
  VacancyWorkExperience,
  VacancyWorkFormat,
  VacancyWorkSchedule,
} from '@/vacancies/entities/vacancy.entity'

interface VacancySeed extends Omit<Vacancy, 'scope' | 'recruiter'> {
  scope: Pick<Scope, 'id'>
  recruiter: Pick<Recruiter, 'id'>
}

export const vacanciesSeed: VacancySeed[] = [
  {
    id: 'e6407993-25a4-4854-b689-2629dc4ad052',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Frontend-разработчик (React)',
    description:
      'Ищем Frontend-разработчика для работы над интерфейсами высоконагруженного веб-приложения.',
    responsibilities:
      'Разработка SPA на React, участие в проектировании UI/UX, взаимодействие с бэкенд-разработчиками.',
    conditions:
      'Официальное оформление, гибкий график, удалёнка 2 дня в неделю.',
    requirements:
      'Опыт работы с React от 2 лет, знание TypeScript, опыт работы с REST API.',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.UpTo3,
    workSchedule: VacancyWorkSchedule.FiveToTwo,
    workFormat: VacancyWorkFormat.Hybrid,
    salaryFrom: 120000,
    salaryTo: 180000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7ea', // Разработка
    },
    recruiter: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
    responsesCount: 0,
  },
  {
    id: '30b1b9c3-874a-478e-9b91-2652f17a8f51',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Junior Frontend Developer',
    description: 'Нужен начинающий фронтендер в команду стартапа.',
    responsibilities:
      'Верстка, подключение API, поддержка существующих страниц.',
    conditions: 'Молодая команда, наставничество, гибкий график.',
    requirements: 'HTML, CSS, базовый JS, желание учиться.',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.NoExperience,
    workSchedule: VacancyWorkSchedule.NoSchedule,
    workFormat: VacancyWorkFormat.Remote,
    salaryFrom: 60000,
    salaryTo: 90000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7ea',
    },
    recruiter: {
      id: 'a3b1ef73-8834-4e45-8f6b-13ef69ac7d09',
    },
    responsesCount: 0,
  },
  {
    id: 'a7032ef0-2b65-4124-9099-1ff1e49f21a2',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Data Analyst',
    description: 'Ищем аналитика данных для анализа поведения пользователей.',
    responsibilities: 'Сбор и анализ данных, построение дашбордов.',
    conditions: 'Офис в центре, ДМС, корпоративное обучение.',
    requirements: 'SQL, Power BI, знание статистики.',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.UpTo6,
    workSchedule: VacancyWorkSchedule.FiveToTwo,
    workFormat: VacancyWorkFormat.OnSite,
    salaryFrom: 150000,
    salaryTo: 200000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7e2', // Аналитика
    },
    recruiter: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
    responsesCount: 0,
  },
  {
    id: 'a8932dc9-b410-48c5-8f1a-d1b71cb3fadb',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Middle Data Analyst',
    description: 'Работа с данными в банковском секторе.',
    responsibilities: 'Анализ клиентской базы, прогнозирование.',
    conditions: 'Гибрид, квартальные бонусы.',
    requirements: 'Python, Pandas, опыт в A/B тестировании.',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.UpTo3,
    workSchedule: VacancyWorkSchedule.FiveToTwo,
    workFormat: VacancyWorkFormat.Hybrid,
    salaryFrom: 130000,
    salaryTo: 180000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7e2', // Аналитика
    },
    recruiter: {
      id: 'a3b1ef73-8834-4e45-8f6b-13ef69ac7d09',
    },
    responsesCount: 0,
  },
  {
    id: '2fa9262b-8f75-49e3-930f-49ea1eaa1e33',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'QA Engineer',
    description: 'Проводим набор тестировщиков в аутсорсинговую компанию.',
    responsibilities: 'Функциональное тестирование, написание тест-кейсов.',
    conditions: 'Удалённая работа, гибкий график.',
    requirements: 'Знание баг-трекинговых систем и тест-дизайна.',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.UpTo3,
    workSchedule: VacancyWorkSchedule.NoSchedule,
    workFormat: VacancyWorkFormat.Remote,
    salaryFrom: 90000,
    salaryTo: 130000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7e1', // Тестирование
    },
    recruiter: {
      id: 'a3b1ef73-8834-4e45-8f6b-13ef69ac7d09',
    },
    responsesCount: 0,
  },
  {
    id: 'c14dfbb6-2124-4f3c-aec8-83d59fcf5a3d',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'UX/UI Designer',
    description: 'Разработка прототипов и интерфейсов.',
    responsibilities: 'Создание UI-kit, работа с Figma.',
    conditions: 'Фулл-тайм, удалёнка.',
    requirements: 'Figma, понимание пользовательского поведения.',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.UpTo3,
    workSchedule: VacancyWorkSchedule.FiveToTwo,
    workFormat: VacancyWorkFormat.Remote,
    salaryFrom: 100000,
    salaryTo: 150000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7e2', // Дизайн
    },
    recruiter: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
    responsesCount: 0,
  },
  {
    id: '1b93bfc3-1123-40a1-b5e1-7c47f2b845f1',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'SMM-специалист',
    description: 'Ведение соцсетей компании.',
    responsibilities: 'Контент-план, публикации, работа с метриками.',
    conditions: 'Офис или удалёнка.',
    requirements: 'Опыт работы с Instagram, VK, Telegram.',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.UpTo3,
    workSchedule: VacancyWorkSchedule.NoSchedule,
    workFormat: VacancyWorkFormat.Hybrid,
    salaryFrom: 80000,
    salaryTo: 110000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7e3', // Маркетинг
    },
    recruiter: {
      id: 'a3b1ef73-8834-4e45-8f6b-13ef69ac7d09',
    },
    responsesCount: 0,
  },
  {
    id: '5f2b58d3-1e67-4c33-b52e-51d88aa3cb01',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Sales Manager',
    description: 'Активные продажи IT-решений.',
    responsibilities: 'Общение с клиентами, ведение CRM.',
    conditions: 'Бонусы за продажи.',
    requirements: 'Коммуникабельность, опыт в продажах.',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.NoExperience,
    workSchedule: VacancyWorkSchedule.FiveToTwo,
    workFormat: VacancyWorkFormat.OnSite,
    salaryFrom: 70000,
    salaryTo: 130000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7e4', // Продажи
    },
    recruiter: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
    responsesCount: 0,
  },
  {
    id: 'f1aa9819-e96e-4c1a-9b19-04f7ee2934d7',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Backend-разработчик (Node.js)',
    description:
      'Участвуйте в разработке серверной части высоконагруженных веб-сервисов.',
    responsibilities:
      'Разработка REST API, работа с БД, обеспечение безопасности приложений.',
    conditions:
      'Гибкий график, гибридный формат работы, корпоративные мероприятия.',
    requirements:
      'Node.js, TypeScript, PostgreSQL, понимание архитектуры приложений.',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.UpTo6,
    workSchedule: VacancyWorkSchedule.FiveToTwo,
    workFormat: VacancyWorkFormat.Hybrid,
    salaryFrom: 150000,
    salaryTo: 200000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7ea', // Бэкенд
    },
    recruiter: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
    responsesCount: 0,
  },
  {
    id: '93c3559a-009b-44c6-b1cf-e50b7b55c2a0',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'DevOps Engineer',
    description:
      'Автоматизация процессов CI/CD и обеспечение стабильности продакшн-среды.',
    responsibilities:
      'Настройка пайплайнов, мониторинг, управление инфраструктурой.',
    conditions: 'Удалённая работа, оплата курсов повышения квалификации.',
    requirements: 'Docker, Kubernetes, GitLab CI/CD, знание Linux.',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.UpTo3,
    workSchedule: VacancyWorkSchedule.FiveToTwo,
    workFormat: VacancyWorkFormat.Remote,
    salaryFrom: 140000,
    salaryTo: 180000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7e8', // DevOps
    },
    recruiter: {
      id: 'a3b1ef73-8834-4e45-8f6b-13ef69ac7d09',
    },
    responsesCount: 0,
  },
  {
    id: 'd6b4f415-d6a1-4f5a-a241-7e95a56b3d1f',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Project Manager',
    description:
      'Управление командой разработки и контроль выполнения проектов.',
    responsibilities:
      'Планирование, постановка задач, взаимодействие с заказчиком.',
    conditions: 'Гибкий график, частично удалённая работа.',
    requirements: 'Знание Agile/Scrum, опыт в IT-проектах от 2 лет.',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.UpTo6,
    workSchedule: VacancyWorkSchedule.FiveToTwo,
    workFormat: VacancyWorkFormat.Hybrid,
    salaryFrom: 160000,
    salaryTo: 210000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7e6', // Project Management
    },
    recruiter: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
    responsesCount: 0,
  },
  {
    id: '44943b90-0c0d-4e9a-8be0-dcf8f376c625',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Сотрудник техподдержки (1-я линия)',
    description: 'Помощь пользователям в решении технических проблем.',
    responsibilities:
      'Приём обращений, базовая диагностика, передача задач 2-й линии.',
    conditions: 'График 2/2, работа в офисе, обучение.',
    requirements:
      'Грамотная речь, знание Windows, умение работать с тикет-системами.',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.NoExperience,
    workSchedule: VacancyWorkSchedule.TwoToTwo,
    workFormat: VacancyWorkFormat.OnSite,
    salaryFrom: 50000,
    salaryTo: 70000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7e7', // Поддержка
    },
    recruiter: {
      id: 'a3b1ef73-8834-4e45-8f6b-13ef69ac7d09',
    },
    responsesCount: 0,
  },
  {
    id: 'd1c7a5aa-1c21-4ec2-bd2c-fecf245dce84',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'HR-специалист',
    description: 'Подбор и адаптация сотрудников в IT-команду.',
    responsibilities: 'Проведение собеседований, ведение базы кандидатов.',
    conditions: 'Гибкий график, удалённая работа.',
    requirements: 'Опыт работы от 1 года, коммуникабельность.',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.UpTo3,
    workSchedule: VacancyWorkSchedule.NoSchedule,
    workFormat: VacancyWorkFormat.Remote,
    salaryFrom: 80000,
    salaryTo: 120000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7f0', // HR
    },
    recruiter: {
      id: 'd269c660-c0b0-4cb2-a4a5-76e5bbfbc86a',
    },
    responsesCount: 0,
  },
  {
    id: '72f0ce07-29de-4ec8-b7f1-0c7f65e3ea8e',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Специалист по информационной безопасности',
    description: 'Обеспечение защиты IT-инфраструктуры компании.',
    responsibilities:
      'Анализ уязвимостей, аудит, разработка политик безопасности.',
    conditions: 'Оформление по ТК, возможность повышения квалификации.',
    requirements: 'Опыт от 2 лет, знание систем защиты и СЗИ.',
    status: VacancyStatus.Active,
    workExperience: VacancyWorkExperience.UpTo3,
    workSchedule: VacancyWorkSchedule.FiveToTwo,
    workFormat: VacancyWorkFormat.OnSite,
    salaryFrom: 130000,
    salaryTo: 170000,
    scope: {
      id: 'c0c6ab44-0df8-4308-ad8b-788b781fc7f1', // Кибербезопасность
    },
    recruiter: {
      id: 'a3b1ef73-8834-4e45-8f6b-13ef69ac7d09',
    },
    responsesCount: 0,
  },
]
