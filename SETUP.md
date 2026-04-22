# 📦 دليل تشغيل المشروع محلياً

## المتطلبات الأساسية

### 1. Node.js (الإصدار 18 أو أحدث)
- **تحميل:** https://nodejs.org
- للتحقق: افتح Terminal واكتب:
  ```bash
  node -v
  ```
  يجب أن يظهر رقم مثل `v18.x.x` أو `v20.x.x`

### 2. Bun (بديل npm أسرع) — اختياري لكن مُفضّل
- **تحميل:** https://bun.sh
- للتحقق:
  ```bash
  bun -v
  ```

---

## خطوات التشغيل

### الخطوة 1: فك ضغط المشروع
فك ضغط الملف الذي حمّلته في أي مجلد تريده

### الخطوة 2: افتح Terminal في مجلد المشروع
```bash
cd path/to/project
```

### الخطوة 3: تثبيت المكتبات
**باستخدام Bun (أسرع):**
```bash
bun install
```

**أو باستخدام npm:**
```bash
npm install
```

### الخطوة 4: إعداد قاعدة البيانات
```bash
bun run db:push
```
أو:
```bash
npx prisma db push
```

### الخطوة 5: تشغيل المشروع
```bash
bun run dev
```
أو:
```bash
npm run dev
```

### الخطوة 6: افتح المتصفح
اذهب إلى العنوان:
```
http://localhost:3000
```

---

## رفع المشروع على GitHub

### الخطوة 1: أنشئ حساب على GitHub
https://github.com/signup

### الخطوة 2: أنشئ Repository جديد
1. ادخل على GitHub
2. اضغط **New Repository**
3. أعطه اسم مثل `portfolio-website`
4. اختر **Private** أو **Public**
5. **لا** تختار Initialize with README
6. اضغط **Create Repository**

### الخطوة 3: ارفع المشروع من Terminal
```bash
cd path/to/project

# إعداد Git
git init
git add .
git commit -m "Initial commit - Portfolio Website"

# ربط مع GitHub (غيّر USERNAME و REPO_NAME)
git remote add origin https://github.com/USERNAME/portfolio-website.git
git branch -M main
git push -u origin main
```

### الخطوة 4: التأكد
ارجع لصفحة الـ Repository على GitHub واعمل Refresh — ستجد كل الملفات

---

## نشر الموقع (اختياري)

### على Vercel (الأسهل ومجاني)
1. اذهب إلى https://vercel.com
2. سجّل حساب جديد أو سجّل دخول بـ GitHub
3. اضغط **Add New Project**
4. اختر الـ Repository من القائمة
5. اضغط **Deploy**
6. بعد دقيقة ستحصل على رابط مثل `your-portfolio.vercel.app`

### على Netlify (بديل مجاني)
1. اذهب إلى https://netlify.com
2. اسحب مجلد المشروع وأفلته (Drag & Drop)
3. أو اربطه بـ GitHub

---

## ملفات المشروع الهامة

```
📁 portfolio-website/
├── 📁 prisma/          ← قاعدة البيانات
├── 📁 public/          ← الصور والملفات الثابتة
│   ├── 📁 projects/    ← صور المشاريع
│   ├── profile-avatar.png
│   └── Mohmed_Yahia_CV.pdf
├── 📁 src/
│   ├── 📁 app/         ← الصفحات و API
│   │   ├── page.tsx    ← الصفحة الرئيسية
│   │   ├── layout.tsx  ← تصميم الموقع العام
│   │   ├── globals.css ← الأنماط CSS
│   │   └── 📁 api/     ← endpoints الخلفية
│   ├── 📁 components/  ← المكونات
│   └── 📁 lib/         ← المكتبات المساعدة
├── package.json        ← المكتبات
├── tailwind.config.ts  ← إعدادات Tailwind
└── next.config.ts      ← إعدادات Next.js
```

---

## أوامر مفيدة

| الأمر | الوظيفة |
|---|---|
| `bun run dev` | تشغيل الموقع في وضع التطوير |
| `bun run build` | بناء الموقع للنشر |
| `bun run lint` | فحص الأخطاء |
| `bun run db:push` | تحديث قاعدة البيانات |

---

## تقنيات المشروع

- **Next.js 16** — إطار العمل
- **React 19** — مكتبة الواجهات
- **TypeScript** — لغة البرمجة
- **Tailwind CSS 4** — التصميم
- **Framer Motion** — الحركات والأنيميشن
- **Prisma + SQLite** — قاعدة البيانات
- **shadcn/ui** — مكتبة المكونات
