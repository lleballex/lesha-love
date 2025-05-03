export interface Paginated<Entity> {
  data: Entity[]
  totalData: number
  totalPages: number
}
