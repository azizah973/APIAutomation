const { describe, it } = require("mocha");
const assert = require("assert");

let token;

describe("Fitur Login", function () {
  
  // POSITIVE CASE: Login valid
  it("POST API Login - positive case", async function () {
    const response = await fetch("https://belajar-bareng.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "admin",
        password: "admin",
      }),
    });

    // Cek status code
    assert.strictEqual(response.status, 200, "Status code should be 200");

    // Ambil data response
    const data = await response.json();

    // Cek message
    assert.strictEqual(data.message, "Login successful", "Login message mismatch");

    // Simpan token untuk request berikutnya
    token = data.token;
  });

  // NEGATIVE CASE: Login salah password
  it("POST API Login - negative case", async function () {
    const response = await fetch("https://belajar-bareng.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "admin",
        password: "salah",
      }),
    });

    // Status code harus error (misal 400 atau 401)
    assert.ok([400, 401].includes(response.status), "Status code should indicate error");

    const data = await response.json();

    // Response tetap ada
    assert.ok(data.message.length > 0, "Response message should not be empty");

    console.log("NEGATIVE CASE STATUS:", response.status);
    console.log("NEGATIVE CASE MESSAGE:", data.message);
  });

  // GET USER menggunakan token dari login valid
  it("Get User", async function () {
    const response = await fetch("https://belajar-bareng.onrender.com/api/users", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    // Cek status code
    assert.strictEqual(response.status, 200, "Status code should be 200");

    // Ambil data response
    const data = await response.json();
    console.log("USERS DATA:", data);
  });
});
