CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

-- for experimenting
DROP TABLE IF EXISTS nodes;
DROP TABLE IF EXISTS edges;
DROP TABLE IF EXISTS history;

CREATE TABLE IF NOT EXISTS nodes (
  id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  props jsonb
);

CREATE TABLE IF NOT EXISTS edges (
  src int NOT NULL,
  dst int NOT NULL,
  props jsonb,
  CONSTRAINT fk_src FOREIGN KEY(src) REFERENCES nodes(id),
  CONSTRAINT fk_dst FOREIGN KEY(dst) REFERENCES nodes(id)
);

CREATE TABLE IF NOT EXISTS history (
  id int NOT NULL,
  time timestamptz NOT NULL,
  props jsonb,
  CONSTRAINT fk_node FOREIGN KEY(id) REFERENCES nodes(id)
);

SELECT create_hypertable('history', 'time', if_not_exists => TRUE);
