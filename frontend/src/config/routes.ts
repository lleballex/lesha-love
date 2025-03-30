export const Routes = {
  home: '/',

  vacancies: '/',
  newVacancy: '/new-vacancy',
  vacancy: (id: string) => `/vacancies/${id}`,
  updateVacancy: (id: string) => `/vacancies/${id}/edit`,
}
