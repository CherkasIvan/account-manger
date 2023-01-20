CREATE EXTENSION "pgcrypto";

CREATE TABLE "accounts"
(
    "id"                       uuid                 NOT NULL DEFAULT gen_random_uuid(),
    "person_id"                uuid                 NOT NULL,
    "balance"                  float                DEFAULT 0.0,
    "daily_withdrawal_limit"   float                NOT NULL,
    "active"                   boolean              DEFAULT true,
    "account_type"             integer              NULL,
    "create_date"              date                 DEFAULT CURRENT_DATE,
    CONSTRAINT "accounts_pk" PRIMARY KEY ("id")
) WITH (
      OIDS = FALSE
      );

CREATE TABLE "transactions"
(
    "id"                       uuid                 NOT NULL DEFAULT gen_random_uuid(),
    "account_id"               uuid                 NOT NULL,
    "value"                    float                NOT NULL,
    "transaction_date"         date                 DEFAULT CURRENT_DATE,
    CONSTRAINT "transactions_pk" PRIMARY KEY ("id")
) WITH (
      OIDS = FALSE
    );

CREATE TABLE "clients"
(
    "id"                       uuid                        NOT NULL DEFAULT gen_random_uuid(),
    "name"                     character varying(300)      NOT NULL,
    "document"                 character varying(10000)    NOT NULL,
    "birth_date"               date                        NOT NULL,
    CONSTRAINT "clients_pk" PRIMARY KEY ("id")
) WITH (
      OIDS = FALSE
    );

ALTER TABLE "accounts"
    ADD CONSTRAINT "accounts_fk_clients_pk" FOREIGN KEY ("person_id") REFERENCES "clients" ("id") ON DELETE CASCADE;

ALTER TABLE "transactions"
    ADD CONSTRAINT "transactions_fk_accounts_pk" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON DELETE CASCADE;

INSERT INTO clients(id, name, document, birth_date) VALUES
('a21ab04c-7212-11ed-a1eb-0242ac120002', 'John', '1DA4CVFA00D', '1995-10-12');
INSERT INTO accounts(id, person_id, balance, daily_withdrawal_limit, account_type) VALUES
('eae6f060-7212-11ed-a1eb-0242ac120002', 'a21ab04c-7212-11ed-a1eb-0242ac120002', 312.88, 100, 1);
