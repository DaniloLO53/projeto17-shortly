--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    user_id integer
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: shortens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shortens (
    id integer NOT NULL,
    shorturl text NOT NULL,
    url text NOT NULL,
    visitcount integer DEFAULT 0 NOT NULL,
    user_id integer
);


--
-- Name: shortens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shortens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shortens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shortens_id_seq OWNED BY public.shortens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: shortens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens ALTER COLUMN id SET DEFAULT nextval('public.shortens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc2OTg3NTk4LCJleHAiOjE2NzcyNDY3OTh9.kzzma8ephPzsL1iFp-tJ5kHWw7YhKyrNZShzjlfe1-0', 1);
INSERT INTO public.sessions VALUES (2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc2OTg3NzcyLCJleHAiOjE2NzcyNDY5NzJ9.UtmxbYHGnAPGA7EUJnsoAFyyZtXInQxw9Ki54camjQ0', 2);
INSERT INTO public.sessions VALUES (3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjc2OTg3ODY4LCJleHAiOjE2NzcyNDcwNjh9.WZYOq5R_V5IUa0PCccUL5addAxgOLSWtClAxVIfAWbU', 3);


--
-- Data for Name: shortens; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shortens VALUES (1, '4d536e4b', 'https://google.com', 4, 1);
INSERT INTO public.shortens VALUES (2, '3f11b866', 'https://youtube.com', 2, 1);
INSERT INTO public.shortens VALUES (3, '0d2d5288', 'https://wikipedia.com', 1, 1);
INSERT INTO public.shortens VALUES (4, 'c6f1e98f', 'https://reddit.com', 2, 2);
INSERT INTO public.shortens VALUES (5, '0ea8c5ce', 'https://reddit.com', 0, 3);
INSERT INTO public.shortens VALUES (6, '9f01bbc4', 'https://reddit.com', 0, 3);
INSERT INTO public.shortens VALUES (7, '9a8b9400', 'https://reddit.com', 4, 3);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Danilo', 'danilo@driven.com.br', '$2b$10$JSZRLcxK6hd10OW9bgwdbeki5L0Z3/Y0A4RQChuA2l7y/JMif0ez6');
INSERT INTO public.users VALUES (2, 'Eliane', 'eliane@driven.com.br', '$2b$10$ibJyitYETNItX6PfpgOaCuFrHZr9rJOz0OIpNgn77i/12PpPUehPq');
INSERT INTO public.users VALUES (3, 'Xavier', 'xavier@driven.com.br', '$2b$10$c8yyCk1CUvwvAyVGYMCDa.gBHabHSto9UXCkYTwT4RSknwZb/VNzi');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: shortens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shortens_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: shortens shortens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT shortens_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: shortens shortens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT shortens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

