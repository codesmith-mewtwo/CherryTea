CREATE TABLE public.users (
	"_id" uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.users_charities (
	"_id" uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
	"user_id" uuid NOT NULL,
	"charity_id" uuid NOT NULL,
	CONSTRAINT "users&charities_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.charities (
	"_id" uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
	"purpose" varchar,
	"financialRating" bigint,
  "overallRating" bigint,
  "accountabilityRating" bigint,
	"missionStatement" varchar,
  "contactInfo" varchar,
	"website" varchar,
	"CNLink" varchar,
  "financialTrend" boolean,
  "overallTrend" boolean,
  "accountabilityTrend" boolean,
  "EIN" varchar NOT NULL,
  CONSTRAINT "charities_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE public.users_charities ADD CONSTRAINT "users_charities_fk0" FOREIGN KEY ("user_id") REFERENCES  public.users("_id");
ALTER TABLE public.users_charities ADD CONSTRAINT "users_charities_fk1" FOREIGN KEY ("charity_id") REFERENCES  public.charities("_id");