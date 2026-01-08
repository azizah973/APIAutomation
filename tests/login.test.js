const { describe, it } = require("mocha");
const assert = require("assert");

let token;

describe("Test Login", function () {
  it("Valid Login", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "admin",
          password: "admin",
        }),
      }
    );

    // Cek status code
    assert.strictEqual(response.status, 200, "Status code should be 200");

    // Ambil data response
    const data = await response.json();

    // Cek message
    assert.strictEqual(data.message, "Login successful", "Login message mismatch");

    // Simpan token untuk request berikutnya
    token = data.token;
  });

  it("Get User", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/users",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    // Cek status code
    assert.strictEqual(response.status, 200, "Status code should be 200");

    // Ambil data response
    const data = await response.json();
    console.log(data); // opsional, untuk debug
  });
});

