CREATE TABLE public.users (
	"_id" serial UNIQUE NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.users_charities (
	"_id" serial UNIQUE NOT NULL,
	"user_id" bigint NOT NULL,
	"charity_id" bigint NOT NULL,
	CONSTRAINT "users&charities_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.charities (
	"_id" serial UNIQUE,
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
  "EIN" varchar NOT NULL
  CONSTRAINT "charities_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE public.users_charities ADD CONSTRAINT "users_charities_fk0" FOREIGN KEY ("user_id") REFERENCES  public.users("_id");
ALTER TABLE public.users_charities ADD CONSTRAINT "users_charities_fk0" FOREIGN KEY ("charity_id") REFERENCES  public.charities("_id");