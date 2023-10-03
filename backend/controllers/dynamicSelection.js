const db = require("../config/db");

const buildQuery = (table, attributes, conds) => {
  const querytemplate = `SELECT ${attributes.join(",")}
    FROM ${table}
    WHERE ${parseConds(conds)};
    `;
  return querytemplate;
};

const parseConds = (conditions) => {
  const whereClause = [];
  const operations = { equal: "=", greater: ">=", less: "<=" };
  const conditionAttrs = Object.keys(conditions);
  conditionAttrs.forEach((item) => {
    const [attribute, op] = item.split("-");
    whereClause.push(`${attribute} ${operations[op]} '${conditions[item]}'`);
  });

  return whereClause.length > 1 ? whereClause.join(" AND ") : whereClause;
};

const getSelectTableAttributes = async (req, res) => {
  const table = req.query.table;
  const attributes = req.query.attributes;
  const conditions = JSON.parse(req.query.conditions);
  console.log(attributes,conditions)

  try {
    const query = buildQuery(table, attributes, conditions);
    if (!table || attributes?.length <= 0 || conditions?.length <= 0) {
      return res
        .status(400)
        .json({ rows: [], message: "Table or attributes not selected!" });
    }

    const data = await db.query(query);
    let colnames = [];
    if (data?.rows && data?.rows.length > 0) {
      const row = data.rows[0];
      colnames = Object.keys(row);
    }
    return res.status(200).json({ rows: data.rows, colnames: colnames });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { getSelectTableAttributes };
