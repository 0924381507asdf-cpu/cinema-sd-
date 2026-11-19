
"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("تم إنشاء الحساب بنجاح!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("تم تسجيل الدخول بنجاح!");
      }
    } catch (error: any) {
      setMessage(
        error.code === "auth/invalid-credential"
          ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
          : error.code === "auth/email-already-in-use"
          ? "هذا البريد مسجل بالفعل"
          : error.code === "auth/weak-password"
          ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
          : error.message
      );
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword() {
    if (!email) {
      setMessage("اكتب بريدك الإلكتروني أولاً");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك");
    } catch {
      setMessage("تعذر إرسال رابط إعادة التعيين");
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>سينما SD</h1>
        <h2>{isRegister ? "إنشاء حساب جديد" : "مرحباً بعودتك"}</h2>
        <p>عالم الأفلام والمسلسلات</p>

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        <button type="submit" disabled={loading}>
          {loading
            ? "يرجى الانتظار..."
            : isRegister
            ? "إنشاء الحساب"
            : "تسجيل الدخول"}
        </button>

        <button
          type="button"
          className="secondary"
          onClick={() => {
            setIsRegister(!isRegister);
            setMessage("");
          }}
        >
          {isRegister ? "لديك حساب؟ تسجيل الدخول" : "إنشاء حساب جديد"}
        </button>

        {!isRegister && (
          <button
            type="button"
            className="forgot"
            onClick={resetPassword}
          >
            نسيت كلمة المرور؟
          </button>
        )}

        {message && <div className="message">{message}</div>}
      </form>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: #090d16;
          color: white;
          direction: rtl;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          padding: 35px 25px;
          border: 1px solid #33313a;
          border-radius: 20px;
          background: #151b29;
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: center;
        }

        h1 {
          color: #d6ad58;
          font-size: 34px;
          margin: 0;
        }

        h2 {
          margin: 0;
        }

        p {
          color: #aaa;
          margin: 0 0 10px;
        }

        input {
          padding: 15px;
          border-radius: 10px;
          border: 1px solid #414858;
          background: #0d1320;
          color: white;
          font-size: 16px;
          text-align: right;
        }

        button {
          padding: 14px;
          border: 0;
          border-radius: 10px;
          background: #d6ad58;
          color: #111;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.6;
        }

        .secondary,
        .forgot {
          background: transparent;
          color: #d6ad58;
          border: 1px solid #414858;
        }

        .forgot {
          border: 0;
          font-weight: normal;
        }

        .message {
          color: #f1d28a;
          overflow-wrap: anywhere;
        }
      `}</style>
    </main>
  );
}
