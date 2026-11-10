export async function registerUser(email, { userRepo, emailService, analytics }) {
  if (!email || !email.includes("@")) {
    throw new Error("Invalid email");
  }

  const existingUser = await userRepo.findByEmail(email);

  if (existingUser) {
    return {
      status: "exists",
      userId: existingUser.id,
    };
  }

  const user = await userRepo.create({ email });

  await emailService.sendWelcome(user.email);

  analytics.track("user_registered", {
    userId: user.id,
  });

  return {
    status: "created",
    userId: user.id,
  };
}