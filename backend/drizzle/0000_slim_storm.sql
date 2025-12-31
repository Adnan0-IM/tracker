CREATE TYPE "public"."period_type" AS ENUM('WEEKLY', 'MONTHLY', 'YEARLY');--> statement-breakpoint
CREATE TYPE "public"."report_type" AS ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'CUSTOM');--> statement-breakpoint
CREATE TABLE "budget" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"categoryId" varchar(255) NOT NULL,
	"period_type" "period_type" NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"alertThreshold" integer DEFAULT 80
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"icon" varchar(255),
	"color" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "expense" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"categoryId" varchar(255) NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"currency" varchar(255) DEFAULT 'USD',
	"description" varchar(255),
	"spent_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" varchar(255) DEFAULT '2025-12-31T17:32:08.119Z',
	"deleted_at" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "report" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"report_type" "report_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "budget" ADD CONSTRAINT "budget_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget" ADD CONSTRAINT "budget_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;