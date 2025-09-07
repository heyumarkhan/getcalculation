// BMI Calculator API for Physics tools
// Endpoint: /api/calculate/physics/bmi-calculator

export default async function (req, res) {
  const { weight, height } = req.body;
  if (!weight || !height) {
    return res.status(400).json({ error: 'Weight and height are required.' });
  }
  // BMI = weight (kg) / [height (m)]^2
  const bmi = weight / (height * height);
  res.json({ result: bmi });
}
