import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // main.ts
  //app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //pnpm install class-transformer class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
/*
Here’s a **short and clear explanation** 👇

---

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

---

# 🔍 What each option does

### ✅ `whitelist: true`

👉 Removes extra fields that are **not defined in DTO**

```json
Input:
{
  "name": "Naresh",
  "email": "test@gmail.com",
  "hack": "malicious"
}

Output:
{
  "name": "Naresh",
  "email": "test@gmail.com"
}
```

---

### ✅ `forbidNonWhitelisted: true`

👉 Instead of removing extra fields, it **throws an error**

```json
Error:
"property hack should not exist"
```

---

### ✅ `transform: true`

👉 Automatically converts data types using **class-transformer**

```json
Input:
{
  "age": "25"
}

Output:
{
  "age": 25
}
```

---

# 🎯 Simple One-Line Meaning

👉

* **whitelist** → remove unknown fields
* **forbidNonWhitelisted** → reject unknown fields
* **transform** → convert types automatically

---

# ⚡ Interview Answer

👉
“ValidationPipe ensures clean, safe, and correctly typed input by removing unwanted fields, rejecting invalid ones, and transforming data types.”
*/
//class-transformer transforms data, 
//but class-validator is required for whitelist validation to allow fields.