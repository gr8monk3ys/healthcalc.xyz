import { NextRequest, NextResponse } from 'next/server';

/**
 * Supported calculators for embedding.
 * Each entry defines the form HTML, the calculation logic (vanilla JS),
 * and the result-rendering logic that runs entirely client-side in the iframe.
 *
 * Note: The innerHTML usage in the embedded page's script is safe because
 * the only values inserted are numeric results from our own calculate()
 * function, concatenated with hardcoded HTML strings. No external or
 * user-supplied strings are injected as raw HTML.
 */

interface EmbedCalculatorConfig {
  title: string;
  description: string;
  formHtml: string;
  calculationScript: string;
}

const SITE_URL = 'https://www.healthcalc.xyz';

const EMBEDDABLE_CALCULATORS: Record<string, EmbedCalculatorConfig> = {
  bmi: {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index',
    formHtml: `
      <div class="field">
        <label for="height">Height (cm)</label>
        <input type="number" id="height" placeholder="e.g. 175" step="0.1" min="50" max="300" required />
      </div>
      <div class="field">
        <label for="weight">Weight (kg)</label>
        <input type="number" id="weight" placeholder="e.g. 70" step="0.1" min="10" max="500" required />
      </div>
    `,
    calculationScript: `
      function calculate() {
        var height = parseFloat(document.getElementById('height').value);
        var weight = parseFloat(document.getElementById('weight').value);
        if (!height || !weight || height <= 0 || weight <= 0) {
          return { error: 'Please enter valid height and weight values.' };
        }
        var heightM = height / 100;
        var bmi = weight / (heightM * heightM);
        bmi = Math.round(bmi * 10) / 10;
        var category = '';
        var color = '';
        if (bmi < 18.5) { category = 'Underweight'; color = '#3B82F6'; }
        else if (bmi < 25) { category = 'Normal weight'; color = '#10B981'; }
        else if (bmi < 30) { category = 'Overweight'; color = '#F59E0B'; }
        else { category = 'Obese'; color = '#EF4444'; }
        var minW = Math.round(18.5 * heightM * heightM * 10) / 10;
        var maxW = Math.round(24.9 * heightM * heightM * 10) / 10;
        return {
          value: bmi,
          color: color,
          label: category,
          details: ['Healthy weight range: ' + minW + ' - ' + maxW + ' kg']
        };
      }
    `,
  },
  tdee: {
    title: 'TDEE Calculator',
    description: 'Calculate your Total Daily Energy Expenditure',
    formHtml: `
      <div class="field">
        <label for="gender">Gender</label>
        <select id="gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="field">
        <label for="age">Age (years)</label>
        <input type="number" id="age" placeholder="e.g. 30" min="1" max="120" required />
      </div>
      <div class="field">
        <label for="height">Height (cm)</label>
        <input type="number" id="height" placeholder="e.g. 175" step="0.1" min="50" max="300" required />
      </div>
      <div class="field">
        <label for="weight">Weight (kg)</label>
        <input type="number" id="weight" placeholder="e.g. 70" step="0.1" min="10" max="500" required />
      </div>
      <div class="field">
        <label for="activity">Activity Level</label>
        <select id="activity" required>
          <option value="1.2">Sedentary (little/no exercise)</option>
          <option value="1.375">Lightly Active (1-3 days/week)</option>
          <option value="1.55" selected>Moderately Active (3-5 days/week)</option>
          <option value="1.725">Very Active (6-7 days/week)</option>
          <option value="1.9">Extra Active (very hard exercise)</option>
        </select>
      </div>
    `,
    calculationScript: `
      function calculate() {
        var gender = document.getElementById('gender').value;
        var age = parseFloat(document.getElementById('age').value);
        var height = parseFloat(document.getElementById('height').value);
        var weight = parseFloat(document.getElementById('weight').value);
        var activity = parseFloat(document.getElementById('activity').value);
        if (!age || !height || !weight) {
          return { error: 'Please fill in all fields with valid values.' };
        }
        var bmr;
        if (gender === 'male') {
          bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
          bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        var tdee = Math.round(bmr * activity);
        bmr = Math.round(bmr);
        return {
          value: tdee + ' cal/day',
          label: 'Total Daily Energy Expenditure',
          details: [
            'BMR: ' + bmr + ' cal/day',
            'Lose weight: ~' + (tdee - 500) + ' cal/day',
            'Gain weight: ~' + (tdee + 500) + ' cal/day'
          ]
        };
      }
    `,
  },
  'body-fat': {
    title: 'Body Fat Calculator',
    description: 'Estimate your body fat percentage (Navy method)',
    formHtml: `
      <div class="field">
        <label for="gender">Gender</label>
        <select id="gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="field">
        <label for="height">Height (cm)</label>
        <input type="number" id="height" placeholder="e.g. 175" step="0.1" min="50" max="300" required />
      </div>
      <div class="field">
        <label for="waist">Waist (cm)</label>
        <input type="number" id="waist" placeholder="e.g. 80" step="0.1" min="30" max="200" required />
      </div>
      <div class="field">
        <label for="neck">Neck (cm)</label>
        <input type="number" id="neck" placeholder="e.g. 38" step="0.1" min="15" max="80" required />
      </div>
      <div class="field" id="hip-field">
        <label for="hip">Hip (cm) - required for women</label>
        <input type="number" id="hip" placeholder="e.g. 95" step="0.1" min="40" max="200" />
      </div>
    `,
    calculationScript: `
      function calculate() {
        var gender = document.getElementById('gender').value;
        var height = parseFloat(document.getElementById('height').value);
        var waist = parseFloat(document.getElementById('waist').value);
        var neck = parseFloat(document.getElementById('neck').value);
        var hip = parseFloat(document.getElementById('hip').value);
        if (!height || !waist || !neck) {
          return { error: 'Please fill in height, waist, and neck measurements.' };
        }
        if (gender === 'female' && !hip) {
          return { error: 'Hip measurement is required for women.' };
        }
        if (waist <= neck) {
          return { error: 'Waist must be larger than neck circumference.' };
        }
        var waistIn = waist / 2.54;
        var neckIn = neck / 2.54;
        var heightIn = height / 2.54;
        var hipIn = hip / 2.54;
        var bf;
        if (gender === 'male') {
          bf = 495 / (1.0324 - 0.19077 * Math.log10(waistIn - neckIn) + 0.15456 * Math.log10(heightIn)) - 450;
        } else {
          bf = 495 / (1.29579 - 0.35004 * Math.log10(waistIn + hipIn - neckIn) + 0.22100 * Math.log10(heightIn)) - 450;
        }
        bf = Math.round(bf * 10) / 10;
        var category = '';
        var color = '';
        if (gender === 'male') {
          if (bf < 6) { category = 'Essential Fat'; color = '#3B82F6'; }
          else if (bf < 14) { category = 'Athletes'; color = '#10B981'; }
          else if (bf < 18) { category = 'Fitness'; color = '#10B981'; }
          else if (bf < 25) { category = 'Average'; color = '#F59E0B'; }
          else { category = 'Obese'; color = '#EF4444'; }
        } else {
          if (bf < 14) { category = 'Essential Fat'; color = '#3B82F6'; }
          else if (bf < 21) { category = 'Athletes'; color = '#10B981'; }
          else if (bf < 25) { category = 'Fitness'; color = '#10B981'; }
          else if (bf < 32) { category = 'Average'; color = '#F59E0B'; }
          else { category = 'Obese'; color = '#EF4444'; }
        }
        return {
          value: bf + '%',
          color: color,
          label: category,
          details: ['Estimated body fat percentage using the U.S. Navy method.']
        };
      }
      document.getElementById('gender').addEventListener('change', function() {
        var hipField = document.getElementById('hip-field');
        if (this.value === 'female') {
          hipField.style.display = 'block';
          document.getElementById('hip').required = true;
        } else {
          hipField.style.display = 'block';
          document.getElementById('hip').required = false;
        }
      });
    `,
  },
  'calorie-deficit': {
    title: 'Calorie Deficit Calculator',
    description: 'Plan safe weight loss with a personalized deficit',
    formHtml: `
      <div class="field">
        <label for="gender">Gender</label>
        <select id="gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="field">
        <label for="age">Age (years)</label>
        <input type="number" id="age" placeholder="e.g. 30" min="1" max="120" required />
      </div>
      <div class="field">
        <label for="height">Height (cm)</label>
        <input type="number" id="height" placeholder="e.g. 175" step="0.1" min="50" max="300" required />
      </div>
      <div class="field">
        <label for="weight">Current Weight (kg)</label>
        <input type="number" id="weight" placeholder="e.g. 85" step="0.1" min="10" max="500" required />
      </div>
      <div class="field">
        <label for="goal">Goal Weight (kg)</label>
        <input type="number" id="goal" placeholder="e.g. 75" step="0.1" min="10" max="500" required />
      </div>
      <div class="field">
        <label for="activity">Activity Level</label>
        <select id="activity" required>
          <option value="1.2">Sedentary</option>
          <option value="1.375">Lightly Active</option>
          <option value="1.55" selected>Moderately Active</option>
          <option value="1.725">Very Active</option>
          <option value="1.9">Extra Active</option>
        </select>
      </div>
      <div class="field">
        <label for="deficit">Deficit Level</label>
        <select id="deficit" required>
          <option value="250">Mild (-250 cal/day)</option>
          <option value="500" selected>Moderate (-500 cal/day)</option>
          <option value="750">Aggressive (-750 cal/day)</option>
        </select>
      </div>
    `,
    calculationScript: `
      function calculate() {
        var gender = document.getElementById('gender').value;
        var age = parseFloat(document.getElementById('age').value);
        var height = parseFloat(document.getElementById('height').value);
        var weight = parseFloat(document.getElementById('weight').value);
        var goal = parseFloat(document.getElementById('goal').value);
        var activity = parseFloat(document.getElementById('activity').value);
        var deficit = parseFloat(document.getElementById('deficit').value);
        if (!age || !height || !weight || !goal) {
          return { error: 'Please fill in all fields.' };
        }
        if (goal >= weight) {
          return { error: 'Goal weight must be less than current weight.' };
        }
        var bmr;
        if (gender === 'male') {
          bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
          bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        var tdee = Math.round(bmr * activity);
        var dailyTarget = tdee - deficit;
        var weightToLose = weight - goal;
        var calPerKg = 7700;
        var totalDeficitNeeded = weightToLose * calPerKg;
        var days = Math.ceil((totalDeficitNeeded / deficit) * 1.1);
        var weeks = Math.ceil(days / 7);
        var weeklyLoss = Math.round((deficit * 7 / calPerKg) * 100) / 100;
        var minCal = gender === 'male' ? 1500 : 1200;
        var warning = '';
        if (dailyTarget < minCal) {
          warning = 'Warning: Target (' + dailyTarget + ' cal) is below the recommended minimum of ' + minCal + ' cal/day.';
        }
        return {
          value: dailyTarget + ' cal/day',
          label: 'Daily Calorie Target',
          details: [
            'Current TDEE: ' + tdee + ' cal/day',
            'Weekly loss: ~' + weeklyLoss + ' kg/week',
            'Estimated time: ~' + weeks + ' weeks (' + days + ' days)'
          ],
          warning: warning
        };
      }
    `,
  },
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmbedHtml(config: EmbedCalculatorConfig, calculator: string, theme: string): string {
  const isDark = theme === 'dark';

  const bgColor = isDark ? '#1a1a2e' : '#f0f0f3';
  const cardBg = isDark ? '#16213e' : '#e0e0e3';
  const textColor = isDark ? '#e0e0e0' : '#333333';
  const labelColor = isDark ? '#a0a0b0' : '#555555';
  const inputBg = isDark ? '#0f3460' : '#d1d1d4';
  const inputBorder = isDark ? '#1a1a4e' : '#c0c0c3';
  const accentColor = '#6366f1';
  const resultBg = isDark ? '#0f3460' : '#d5d5d8';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(config.title)} - HealthCheck</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: ${bgColor};
      color: ${textColor};
      padding: 16px;
      line-height: 1.5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .container {
      max-width: 480px;
      margin: 0 auto;
      width: 100%;
      flex: 1;
    }
    h1 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 4px;
      color: ${textColor};
    }
    .subtitle {
      font-size: 0.85rem;
      color: ${labelColor};
      margin-bottom: 16px;
    }
    .card {
      background: ${cardBg};
      border-radius: 12px;
      padding: 20px;
      box-shadow: ${
        isDark
          ? '4px 4px 8px #0d0d1a, -4px -4px 8px #272742'
          : '6px 6px 12px #bebec1, -6px -6px 12px #ffffff'
      };
      margin-bottom: 16px;
    }
    .field {
      margin-bottom: 14px;
    }
    .field label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      color: ${labelColor};
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .field input,
    .field select {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid ${inputBorder};
      border-radius: 8px;
      background: ${inputBg};
      color: ${textColor};
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      -webkit-appearance: none;
    }
    .field input:focus,
    .field select:focus {
      border-color: ${accentColor};
      box-shadow: 0 0 0 2px ${accentColor}33;
    }
    .field select {
      cursor: pointer;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='${isDark ? '%23a0a0b0' : '%23555'}' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 32px;
    }
    .btn-row {
      display: flex;
      gap: 10px;
      margin-top: 4px;
    }
    .btn-calculate {
      flex: 1;
      padding: 11px 16px;
      background: ${accentColor};
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .btn-calculate:hover { opacity: 0.9; }
    .btn-calculate:focus-visible {
      outline: 2px solid ${accentColor};
      outline-offset: 2px;
    }
    .btn-reset {
      padding: 11px 16px;
      background: transparent;
      color: ${labelColor};
      border: 1px solid ${inputBorder};
      border-radius: 8px;
      font-size: 0.95rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-reset:hover { background: ${inputBg}; }
    .btn-reset:focus-visible {
      outline: 2px solid ${accentColor};
      outline-offset: 2px;
    }
    #result {
      display: none;
      background: ${resultBg};
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      box-shadow: ${
        isDark
          ? 'inset 2px 2px 4px #0d0d1a, inset -2px -2px 4px #272742'
          : 'inset 3px 3px 6px #bebec1, inset -3px -3px 6px #ffffff'
      };
      margin-bottom: 16px;
    }
    #result.visible { display: block; }
    .result-value {
      font-size: 2rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 4px;
    }
    .result-label {
      font-size: 1rem;
      font-weight: 600;
      color: ${labelColor};
      margin-bottom: 8px;
    }
    .result-detail {
      font-size: 0.85rem;
      color: ${labelColor};
      margin-top: 4px;
    }
    .result-warning {
      font-size: 0.8rem;
      color: #EF4444;
      margin-top: 8px;
      padding: 8px;
      background: ${isDark ? '#2d1b1b' : '#fef2f2'};
      border-radius: 6px;
    }
    .error-message {
      color: #EF4444;
      font-size: 0.85rem;
      padding: 10px;
      background: ${isDark ? '#2d1b1b' : '#fef2f2'};
      border-radius: 6px;
    }
    .powered-by {
      text-align: center;
      padding: 12px 0 4px;
      font-size: 0.75rem;
      color: ${labelColor};
    }
    .powered-by a {
      color: ${accentColor};
      text-decoration: none;
      font-weight: 600;
    }
    .powered-by a:hover { text-decoration: underline; }
    @media (max-width: 360px) {
      body { padding: 10px; }
      .card { padding: 14px; }
      h1 { font-size: 1.1rem; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${escapeHtml(config.title)}</h1>
    <p class="subtitle">${escapeHtml(config.description)}</p>

    <div class="card">
      <form id="calc-form" novalidate>
        ${config.formHtml}
        <div class="btn-row">
          <button type="submit" class="btn-calculate">Calculate</button>
          <button type="button" class="btn-reset" id="reset-btn">Reset</button>
        </div>
      </form>
    </div>

    <div id="result" role="region" aria-live="polite"></div>

    <div class="powered-by">
      Powered by <a href="${SITE_URL}/${calculator}" target="_blank" rel="noopener">HealthCheck</a>
    </div>
  </div>

  <script>
    ${config.calculationScript}
    var EMBED_ANALYTICS_ENDPOINT = '/api/embed-analytics';
    var EMBED_CALCULATOR = ${JSON.stringify(calculator)};
    var hasTrackedCalculation = false;

    function sendEmbedAnalytics(action) {
      try {
        var payload = JSON.stringify({
          calculator: EMBED_CALCULATOR,
          action: action,
          referrer: document.referrer || ''
        });

        if (navigator.sendBeacon && typeof Blob !== 'undefined') {
          var blob = new Blob([payload], { type: 'application/json' });
          navigator.sendBeacon(EMBED_ANALYTICS_ENDPOINT, blob);
          return;
        }

        fetch(EMBED_ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true
        }).catch(function() {});
      } catch (_error) {
        // Ignore analytics failures in embedded widgets.
      }
    }

    function renderResult(data) {
      var el = document.getElementById('result');
      while (el.firstChild) { el.removeChild(el.firstChild); }

      if (data.error) {
        var errDiv = document.createElement('div');
        errDiv.className = 'error-message';
        errDiv.textContent = data.error;
        el.appendChild(errDiv);
      } else {
        var valDiv = document.createElement('div');
        valDiv.className = 'result-value';
        if (data.color) { valDiv.style.color = data.color; }
        valDiv.textContent = String(data.value);
        el.appendChild(valDiv);

        if (data.label) {
          var lblDiv = document.createElement('div');
          lblDiv.className = 'result-label';
          lblDiv.textContent = data.label;
          el.appendChild(lblDiv);
        }

        if (data.details && data.details.length) {
          for (var i = 0; i < data.details.length; i++) {
            var detDiv = document.createElement('div');
            detDiv.className = 'result-detail';
            detDiv.textContent = data.details[i];
            el.appendChild(detDiv);
          }
        }

        if (data.warning) {
          var warnDiv = document.createElement('div');
          warnDiv.className = 'result-warning';
          warnDiv.textContent = data.warning;
          el.appendChild(warnDiv);
        }
      }

      el.classList.add('visible');
    }

    document.getElementById('calc-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var result = calculate();
      renderResult(result);
      if (!result.error && !hasTrackedCalculation) {
        hasTrackedCalculation = true;
        sendEmbedAnalytics('calculate');
      }
    });

    document.getElementById('reset-btn').addEventListener('click', function() {
      document.getElementById('calc-form').reset();
      var el = document.getElementById('result');
      el.classList.remove('visible');
      while (el.firstChild) { el.removeChild(el.firstChild); }
    });

    sendEmbedAnalytics('view');
  </script>
</body>
</html>`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ calculator: string }> }
): Promise<NextResponse> {
  const { calculator } = await params;
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme') === 'dark' ? 'dark' : 'light';

  const config = EMBEDDABLE_CALCULATORS[calculator];

  if (!config) {
    const available = Object.keys(EMBEDDABLE_CALCULATORS).join(', ');
    const errorHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/></head><body><p>Calculator &quot;${escapeHtml(calculator)}&quot; is not available for embedding. Available: ${escapeHtml(available)}</p></body></html>`;
    return new NextResponse(errorHtml, {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const html = buildEmbedHtml(config, calculator, theme);

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // Framing/CSP headers are handled centrally in src/middleware.ts so we can
      // scope embedding to intentional surfaces.
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
