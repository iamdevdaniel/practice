import {describe, expect, test, jest } from '@jest/globals';
import { registerUser } from '../src/registerUser';

const existingUser = null

const userRepo = {
	findByEmail: jest.fn().mockResolvedValueOnce(null),
	create: jest.fn().mockResolvedValueOnce({status: 'created', id: 1 })
}

const emailService = {
	sendWelcome: jest.fn(() => undefined)
}

const analytics = {
	track: jest.fn(() => undefined)
}

describe("registerUser", () => {
  test("creates a new user", async () => {
	  // (email, { userRepo, emailService, analytics }) {
	const actual = await registerUser('dm@gmail.com',{ userRepo, emailService, analytics})

	expect(actual.status).toBe('created')
	expect(actual.userId).toBe(1)
  });

  test("does not create the user when they already exist", async () => {
    // TODO
  });

  test("sends a welcome email after creating a user", async () => {
    // TODO
  });

  test("tracks the registration event", async () => {
    // TODO
  });

  test("rejects an invalid email", async () => {
    // TODO
  });
});