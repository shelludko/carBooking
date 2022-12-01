--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Homebrew)
-- Dumped by pg_dump version 14.4

-- Started on 2022-12-01 18:49:13 MSK

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
-- TOC entry 214 (class 1259 OID 17745)
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    car_id integer NOT NULL,
    user_id integer NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    price integer NOT NULL
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 17744)
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bookings_id_seq OWNER TO postgres;

--
-- TOC entry 3614 (class 0 OID 0)
-- Dependencies: 213
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- TOC entry 212 (class 1259 OID 17606)
-- Name: discounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discounts (
    id integer NOT NULL,
    rate_id integer NOT NULL,
    percent integer NOT NULL,
    start_day integer NOT NULL,
    end_day integer NOT NULL
);


ALTER TABLE public.discounts OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 17605)
-- Name: discounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.discounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discounts_id_seq OWNER TO postgres;

--
-- TOC entry 3615 (class 0 OID 0)
-- Dependencies: 211
-- Name: discounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.discounts_id_seq OWNED BY public.discounts.id;


--
-- TOC entry 210 (class 1259 OID 17597)
-- Name: rates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rates (
    id integer NOT NULL,
    name character varying NOT NULL,
    price integer NOT NULL
);


ALTER TABLE public.rates OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 17596)
-- Name: rates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rates_id_seq OWNER TO postgres;

--
-- TOC entry 3616 (class 0 OID 0)
-- Dependencies: 209
-- Name: rates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rates_id_seq OWNED BY public.rates.id;


--
-- TOC entry 3456 (class 2604 OID 17748)
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- TOC entry 3455 (class 2604 OID 17609)
-- Name: discounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts ALTER COLUMN id SET DEFAULT nextval('public.discounts_id_seq'::regclass);


--
-- TOC entry 3454 (class 2604 OID 17600)
-- Name: rates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rates ALTER COLUMN id SET DEFAULT nextval('public.rates_id_seq'::regclass);


--
-- TOC entry 3608 (class 0 OID 17745)
-- Dependencies: 214
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (id, car_id, user_id, start_date, end_date, price) FROM stdin;
\.


--
-- TOC entry 3606 (class 0 OID 17606)
-- Dependencies: 212
-- Data for Name: discounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.discounts (id, rate_id, percent, start_day, end_day) FROM stdin;
1	1	5	5	9
2	1	10	10	17
3	1	15	18	29
\.


--
-- TOC entry 3604 (class 0 OID 17597)
-- Dependencies: 210
-- Data for Name: rates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rates (id, name, price) FROM stdin;
1	base	1000
\.


--
-- TOC entry 3617 (class 0 OID 0)
-- Dependencies: 213
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_id_seq', 1, false);


--
-- TOC entry 3618 (class 0 OID 0)
-- Dependencies: 211
-- Name: discounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.discounts_id_seq', 1, false);


--
-- TOC entry 3619 (class 0 OID 0)
-- Dependencies: 209
-- Name: rates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rates_id_seq', 1, false);


--
-- TOC entry 3462 (class 2606 OID 17750)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- TOC entry 3460 (class 2606 OID 17611)
-- Name: discounts discounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_pkey PRIMARY KEY (id);


--
-- TOC entry 3458 (class 2606 OID 17604)
-- Name: rates rates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rates
    ADD CONSTRAINT rates_pkey PRIMARY KEY (id);


--
-- TOC entry 3463 (class 2606 OID 17612)
-- Name: discounts fk_discounts_rates_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT fk_discounts_rates_id FOREIGN KEY (rate_id) REFERENCES public.rates(id);


-- Completed on 2022-12-01 18:49:14 MSK

--
-- PostgreSQL database dump complete
--

