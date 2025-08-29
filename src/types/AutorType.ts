export type AuthorType = {
  _id: string,
  name: string,
  bio: string,
  nationality: string,
  photo: string,
  website: string | null,
  books: string[],
  isMulti: true,
}