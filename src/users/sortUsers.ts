import { UserWithoutId } from "../types";

type SortingDirection = "asc" | "desc";

export default function sortUsers(
  users: UserWithoutId[],
  sortingDirection: SortingDirection
): UserWithoutId[] {
  // Clone the original array to avoid mutating it
  const clonedUsers = [...users];

  // Unified sort function
  const sortOrder = sortingDirection === "asc" ? 1 : -1;
  return clonedUsers.sort((a, b) => (a.age - b.age) * sortOrder);
}
