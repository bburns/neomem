CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

-- for experimenting
-- DROP TABLE IF EXISTS history;
-- DROP TABLE IF EXISTS edges;
-- DROP TABLE IF EXISTS nodes;

CREATE TABLE IF NOT EXISTS nodes (
  _id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name text,
  created timestamptz,
  modified timestamptz,
  props jsonb
);

CREATE TABLE IF NOT EXISTS edges (
  _from int NOT NULL,
  _to int NOT NULL,
  props jsonb,
  CONSTRAINT fk_src FOREIGN KEY(_from) REFERENCES nodes(_id),
  CONSTRAINT fk_dst FOREIGN KEY(_to) REFERENCES nodes(_id)
);

CREATE TABLE IF NOT EXISTS history (
  _id int NOT NULL,
  time timestamptz NOT NULL,
  props jsonb,
  CONSTRAINT fk_node FOREIGN KEY(_id) REFERENCES nodes(_id)
);

SELECT create_hypertable('history', 'time', if_not_exists => TRUE);

-- test data

INSERT INTO nodes (name)
VALUES
  ('plecy'),
  ('fishtank'),
  ('contains')
  ;

CREATE OR REPLACE FUNCTION lookup(name)
    RETURNS int
    LANGUAGE PLPGSQL
  AS
$$
DECLARE 
-- VARIABLE DECLARATION
BEGIN
 -- LOGIC
END;
$$

INSERT INTO edges (_from, _to, props)
VALUES 
  (lookup('fishtank'), lookup('plecy'), {'type': lookup('contains')})
  ;
  -- (SELECT _id FROM nodes WHERE name='fishtank', 
  --  SELECT _id FROM nodes WHERE name='plecy',
  --  {"type": SELECT _id FROM nodes WHERE name='contains'}::jsonb
  --  );

INSERT INTO history (_id, time, props)
VALUES 
  (lookup('plecy'), now(), {'size': '3in'}),
  (lookup('plecy'), now(), {'size': '3in'})
  ;
