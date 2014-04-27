--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Roles; Type: TABLE; Schema: public; Owner: ivpusic; Tablespace: 
--

CREATE TABLE "Roles" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Roles" OWNER TO ivpusic;

--
-- Name: Roles_id_seq; Type: SEQUENCE; Schema: public; Owner: ivpusic
--

CREATE SEQUENCE "Roles_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Roles_id_seq" OWNER TO ivpusic;

--
-- Name: Roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ivpusic
--

ALTER SEQUENCE "Roles_id_seq" OWNED BY "Roles".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: ivpusic; Tablespace: 
--

CREATE TABLE "Users" (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "RoleId" integer
);


ALTER TABLE public."Users" OWNER TO ivpusic;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: ivpusic
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO ivpusic;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ivpusic
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ivpusic
--

ALTER TABLE ONLY "Roles" ALTER COLUMN id SET DEFAULT nextval('"Roles_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ivpusic
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: ivpusic
--

COPY "Roles" (id, name, "createdAt", "updatedAt") FROM stdin;
1	User	2014-04-27 01:37:23.685109+02	2014-04-27 01:37:23.685109+02
2	Admin	2014-04-27 01:37:27.660723+02	2014-04-27 01:37:27.660723+02
3	Moderator	2014-04-27 01:37:32.885091+02	2014-04-27 01:37:32.885091+02
\.


--
-- Name: Roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ivpusic
--

SELECT pg_catalog.setval('"Roles_id_seq"', 3, true);


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: ivpusic
--

COPY "Users" (id, email, password, "createdAt", "updatedAt", "RoleId") FROM stdin;
1	pusic007@gmail.com	$2a$10$tTxeV4nc/dlusi/BNu1ilO9Iu/pmiSGBKgNqYzR3ZOG6JTD1OrPg.	2014-04-27 01:37:35.768+02	2014-04-27 01:37:35.768+02	1
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ivpusic
--

SELECT pg_catalog.setval('"Users_id_seq"', 1, true);


--
-- Name: Roles_name_key; Type: CONSTRAINT; Schema: public; Owner: ivpusic; Tablespace: 
--

ALTER TABLE ONLY "Roles"
    ADD CONSTRAINT "Roles_name_key" UNIQUE (name);


--
-- Name: Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: ivpusic; Tablespace: 
--

ALTER TABLE ONLY "Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- Name: Users_pkey; Type: CONSTRAINT; Schema: public; Owner: ivpusic; Tablespace: 
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users_RoleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ivpusic
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES "Roles"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

