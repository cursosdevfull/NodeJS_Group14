describe("Test unit", () => {
  it("should be true", () => {
    // Arrange
    const userExists = true;

    // Act
    const message = userExists ? "User exists" : "User does not exist";

    // Assert
    expect(message).toBe("User exists");
  });
});
