const neo4j = require('neo4j-driver').v1

/**
 * Neo4j driver configuration
 *
 * Return: configured neo4j driver.
 */
module.exports = () =>
  neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'neo4j'))
