import { describe, expect, test } from "bun:test";
import { UserWithoutId } from "../types";
import sortUsers from "./sortUsers";

describe("sorting", () => {
  const users: UserWithoutId[] = [
    { name: "Bob", age: 45 },
    { name: "Charlie", age: 50 },
    { name: "David", age: 22 },
  ];

  describe("users", () => {
    describe("by age", () => {
      test("asc", () => {
        expect(sortUsers(users, "asc")).toEqual([
          { name: "David", age: 22 },
          { name: "Bob", age: 45 },
          { name: "Charlie", age: 50 },
        ]);
      });
      test("desc", () => {
        expect(sortUsers(users, "desc")).toEqual([
          { name: "Charlie", age: 50 },
          { name: "Bob", age: 45 },
          { name: "David", age: 22 },
        ]);
      });
    });
  });
});
