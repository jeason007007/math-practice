// ==================== 新增模块 ====================

// 模块变量
let currentExpressionIndex = 0;
let expressionQuestions = [];

let currentRadicalIndex = 0;
let radicalQuestions = [];

let currentQuadEquationIndex = 0;
let quadEquationQuestions = [];

let currentFractionalEquationIndex = 0;
let fractionalEquationQuestions = [];

let currentRightTriangleIndex = 0;
let rightTriangleQuestions = [];

let currentCongruentIndex = 0;
let congruentQuestions = [];

let currentParallelogramIndex = 0;
let parallelogramQuestions = [];

// ==================== 整式运算模块 ====================

function generateExpressionQuestionData() {
    const types = ['乘法公式', '幂的运算', '因式分解'];
    const type = types[Math.floor(Math.random() * types.length)];

    let question, answer, hint;

    if (type === '乘法公式') {
        const a = Math.floor(Math.random() * 5) + 2;
        if (Math.random() > 0.5) {
            // 平方差公式
            question = `【整式运算】计算：(x + ${a})(x - ${a})`;
            answer = `x² - ${a*a}`;
            hint = '使用平方差公式：(a+b)(a-b) = a²-b²';
        } else {
            // 完全平方公式
            question = `【整式运算】计算：(x + ${a})²`;
            answer = `x² + ${2*a}x + ${a*a}`;
            hint = '使用完全平方公式：(a+b)² = a²+2ab+b²';
        }
    } else if (type === '幂的运算') {
        const m = Math.floor(Math.random() * 3) + 2;
        const n = Math.floor(Math.random() * 3) + 2;
        question = `【整式运算】计算：a^{${m}} · a^{${n}}`;
        answer = `a^${m+n}`;
        hint = '使用幂的运算法则：a^m · a^n = a^(m+n)';
    } else {
        // 因式分解
        const a = Math.floor(Math.random() * 5) + 2;
        question = `【整式运算】分解因式：x² - ${a*a}`;
        answer = `(x + ${a})(x - ${a})`;
        hint = '使用平方差公式分解：a²-b² = (a+b)(a-b)';
    }

    return {
        question: question,
        answer: answer,
        hint: hint,
        type: type
    };
}

function checkExpressionAnswer() {
    const answerInput = document.getElementById('expression-answer');
    const resultDiv = document.getElementById('expression-result');
    const feedbackDiv = document.getElementById('expression-feedback');
    const hintDiv = document.getElementById('expression-hint');
    const hintText = document.getElementById('expression-hint-text');

    const userAnswer = answerInput.value.trim().replace(/\s+/g, '');
    const currentQuestion = expressionQuestions[currentExpressionIndex];

    // 显示提示
    hintText.textContent = currentQuestion.hint;
    hintDiv.style.display = 'block';

    // 检查答案（简化版）
    const correctAnswer = currentQuestion.answer.replace(/\s+/g, '');
    let isCorrect = false;

    if (userAnswer === correctAnswer ||
        (userAnswer.includes(correctAnswer) && correctAnswer.length > 3)) {
        isCorrect = true;
    }

    if (isCorrect) {
        resultDiv.textContent = '✓ 正确！';
        resultDiv.className = 'result correct';
        feedbackDiv.innerHTML = getExpressionFeedback();
        feedbackDiv.classList.add('show');
    } else {
        resultDiv.textContent = '✗ 错误，请再试试';
        resultDiv.className = 'result incorrect';
        feedbackDiv.classList.remove('show');
    }
}

function getExpressionFeedback() {
    return `
        <div class="feedback-title">📚 整式运算知识点讲解</div>

        <div class="knowledge-section">
            <h4>🎯 核心知识点</h4>
            <p><strong>1. 幂的运算法则：</strong></p>
            <p>• 同底数幂相乘：a^m · a^n = a^(m+n)</p>
            <p>• 幂的乘方：(a^m)^n = a^(mn)</p>
            <p>• 积的乘方：(ab)^n = a^n · b^n</p>
        </div>

        <div class="knowledge-section">
            <h4>🎯 乘法公式：</h4>
            <p><strong>1. 平方差公式：</strong>(a+b)(a-b) = a²-b²</p>
            <p><strong>2. 完全平方公式：</strong></p>
            <p>• (a+b)² = a²+2ab+b²</p>
            <p>• (a-b)² = a²-2ab+b²</p>
        </div>

        <div class="knowledge-section">
            <h4>🎯 因式分解：</h4>
            <p><strong>1. 提公因式法：</strong>ma+mb = m(a+b)</p>
            <p><strong>2. 公式法：</strong></p>
            <p>• a²-b² = (a+b)(a-b)</p>
            <p>• a²±2ab+b² = (a±b)²</p>
        </div>

        <div class="tip-box">
            <strong>⚡ 快速掌握技巧：</strong><br>
            <strong>乘法公式：</strong>"首平方、尾平方、两倍积中间放"<br><br>
            <strong>记忆口诀：</strong>"同底相加，乘方相乘，积幂分幂"
        </div>
    `;
}

// ==================== 二次根式模块 ====================

function generateRadicalQuestionData() {
    const types = ['化简', '运算', '最简二次根式'];
    const type = types[Math.floor(Math.random() * types.length)];

    let question, answer, hint;

    if (type === '化简') {
        const num = Math.floor(Math.random() * 10) + 8;
        question = `【二次根式】化简：√${num}`;

        // 计算化简结果
        let result = '';
        let coefficient = 1;
        let radicand = num;

        for (let i = 2; i * i <= num; i++) {
            while (radicand % (i * i) === 0) {
                coefficient *= i;
                radicand /= i * i;
            }
        }

        if (radicand === 1) {
            result = `${coefficient}`;
        } else if (coefficient === 1) {
            result = `√${radicand}`;
        } else {
            result = `${coefficient}√${radicand}`;
        }

        answer = result;
        hint = '化简为最简二次根式：提取能开得尽方的因数';
    } else if (type === '运算') {
        const n = Math.floor(Math.random() * 5) + 2;
        const m = Math.floor(Math.random() * 5) + 2;
        question = `【二次根式】计算：√${n*n * m} + √${n * n}`;
        answer = `${n}√${m} + ${n}`;
        hint = '先化简为最简二次根式，再合并同类二次根式';
    } else {
        // 判断是否为最简二次根式
        const num = Math.floor(Math.random() * 10) + 5;
        question = `【二次根式】判断：√${num} 是最简二次根式吗？`;

        // 判断是否为最简二次根式
        let isSimplest = true;
        for (let i = 2; i * i <= num; i++) {
            if (num % (i * i) === 0) {
                isSimplest = false;
                break;
            }
        }

        answer = isSimplest ? '是' : '不是';
        hint = '最简二次根式：被开方数不含能开得尽方的因数';
    }

    return {
        question: question,
        answer: answer,
        hint: hint,
        type: type
    };
}

function checkRadicalAnswer() {
    const answerInput = document.getElementById('radical-answer');
    const resultDiv = document.getElementById('radical-result');
    const feedbackDiv = document.getElementById('radical-feedback');
    const hintDiv = document.getElementById('radical-hint');
    const hintText = document.getElementById('radical-hint-text');

    const userAnswer = answerInput.value.trim().replace(/\s+/g, '');
    const currentQuestion = radicalQuestions[currentRadicalIndex];

    hintText.textContent = currentQuestion.hint;
    hintDiv.style.display = 'block';

    const correctAnswer = currentQuestion.answer.replace(/\s+/g, '');
    let isCorrect = false;

    if (userAnswer === correctAnswer ||
        (userAnswer.includes(correctAnswer) && correctAnswer.length > 2)) {
        isCorrect = true;
    }

    if (isCorrect) {
        resultDiv.textContent = '✓ 正确！';
        resultDiv.className = 'result correct';
        feedbackDiv.innerHTML = getRadicalFeedback();
        feedbackDiv.classList.add('show');
    } else {
        resultDiv.textContent = '✗ 错误，请再试试';
        resultDiv.className = 'result incorrect';
        feedbackDiv.classList.remove('show');
    }
}

function getRadicalFeedback() {
    return `
        <div class="feedback-title">📚 二次根式知识点讲解</div>

        <div class="knowledge-section">
            <h4>🎯 核心知识点</h4>
            <p><strong>1. 二次根式的性质：</strong></p>
            <p>• √a² = |a|（注意绝对值）</p>
            <p>• √(ab) = √a · √b</p>
            <p>• √(a/b) = √a/√b（b≠0）</p>
        </div>

        <div class="knowledge-section">
            <h4>🎯 二次根式的运算：</strong></h4>
            <p><strong>1. 加减法：</strong>先化简为最简二次根式，再合并同类二次根式</p>
            <p><strong>2. 乘法：</strong>√a · √b = √(ab)</p>
            <p><strong>3. 除法：</strong>√a/√b = √(a/b) 或 分母有理化</p>
        </div>

        <div class="knowledge-section">
            <h4>🎯 最简二次根式：</strong></h4>
            <p>1. 被开方数不含分母</p>
            <p>2. 被开方数不含能开得尽方的因数</p>
        </div>

        <div class="tip-box">
            <strong>⚡ 快速掌握技巧：</strong><br>
            <strong>化简步骤：</strong>1.分解质因数 2.提取完全平方数 3.整理<br><br>
            <strong>记忆口诀：</strong>"化简要彻底，分母要化掉"
        </div>
    `;
}

// ==================== 一元二次方程模块 ====================

function generateQuadEquationQuestionData() {
    const types = ['配方法', '公式法', '判别式'];
    const type = types[Math.floor(Math.random() * types.length)];

    let question, answer, hint;

    if (type === '配方法' || type === '公式法') {
        const b = Math.floor(Math.random() * 10) - 5;
        const c = Math.floor(Math.random() * 6);

        question = `【一元二次方程】解方程：x² ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)} = 0`;

        // 计算判别式
        const delta = b * b - 4 * c;

        if (delta > 0) {
            const x1 = (-b + Math.sqrt(delta)) / 2;
            const x2 = (-b - Math.sqrt(delta)) / 2;
            if (x1 === Math.round(x1) && x2 === Math.round(x2)) {
                answer = `x₁=${Math.round(x1)}, x₂=${Math.round(x2)}`;
            } else {
                answer = `x₁=${x1.toFixed(2)}, x₂=${x2.toFixed(2)}`;
            }
        } else if (delta === 0) {
            const x = -b / 2;
            answer = `x=${x}`;
        } else {
            answer = '无实数根';
        }

        hint = type === '配方法' ? '使用配方法：先配方，再开方' : '使用公式法：先算Δ，再套公式';
    } else {
        // 判别式判断
        const b = Math.floor(Math.random() * 8) - 4;
        const c = Math.floor(Math.random() * 8) - 4;

        question = `【一元二次方程】方程 x² ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)} = 0 有几个实数根？`;

        const delta = b * b - 4 * c;

        if (delta > 0) {
            answer = '两个不等实根';
        } else if (delta === 0) {
            answer = '两个相等实根';
        } else {
            answer = '无实数根';
        }

        hint = '先计算判别式Δ = b² - 4ac';
    }

    return {
        question: question,
        answer: answer,
        hint: hint,
        type: type
    };
}

function checkQuadEquationAnswer() {
    const answerInput = document.getElementById('quadEquation-answer');
    const resultDiv = document.getElementById('quadEquation-result');
    const feedbackDiv = document.getElementById('quadEquation-feedback');
    const hintDiv = document.getElementById('quadEquation-hint');
    const hintText = document.getElementById('quadEquation-hint-text');

    const userAnswer = answerInput.value.trim().replace(/\s+/g, '').toLowerCase();
    const currentQuestion = quadEquationQuestions[currentQuadEquationIndex];

    hintText.textContent = currentQuestion.hint;
    hintDiv.style.display = 'block';

    const correctAnswer = currentQuestion.answer.replace(/\s+/g, '').toLowerCase();
    let isCorrect = false;

    if (userAnswer.includes(correctAnswer.replace(/x₁=|x₂=|x=/g, ''))) {
        isCorrect = true;
    }

    if (isCorrect) {
        resultDiv.textContent = '✓ 正确！';
        resultDiv.className = 'result correct';
        feedbackDiv.innerHTML = getQuadEquationFeedback();
        feedbackDiv.classList.add('show');
    } else {
        resultDiv.textContent = '✗ 错误，请再试试';
        resultDiv.className = 'result incorrect';
        feedbackDiv.classList.remove('show');
    }
}

function getQuadEquationFeedback() {
    return `
        <div class="feedback-title">📚 一元二次方程知识点讲解</div>

        <div class="knowledge-section">
            <h4>🎯 配方法解方程：</h4>
            <p><strong>1. 移项：</strong>ax²+bx+c=0</p>
            <p><strong>2. 除以a：</strong>x²+(b/a)x+c/a=0</p>
            <p><strong>3. 配方：</strong>(x+b/2a)² = (b²-4ac)/4a²</p>
            <p><strong>4. 开方：</strong>x = [-b±√(b²-4ac)]/2a</p>
        </div>

        <div class="knowledge-section">
            <h4>🎯 公式法解方程：</h4>
            <p><strong>1. 判别式：</strong>Δ = b²-4ac</p>
            <p><strong>2. Δ>0：</strong>两个不等实根</p>
            <p><strong>3. Δ=0：</strong>两个相等实根</p>
            <p><strong>4. Δ<0：</strong>无实根</p>
            <p><strong>5. 求根公式：</strong>x = [-b±√(b²-4ac)]/2a</p>
        </div>

        <div class="tip-box">
            <strong>⚡ 快速掌握技巧：</strong><br>
            <strong>配方法：</strong>"移项配方，两边开方"<br>
            <strong>公式法：</strong>"先算Δ，再套公式"<br><br>
            <strong>记忆口诀：</strong>"配方开方根，Δ判定根个数"
        </div>
    `;
}

// ==================== 分式方程模块 ====================

function generateFractionalEquationQuestionData() {
    const types = ['解方程', '增根'];
    const type = types[Math.floor(Math.random() * types.length)];

    let question, answer, hint;

    if (type === '解方程') {
        const a = Math.floor(Math.random() * 3) + 2;
        const b = Math.floor(Math.random() * 3) + 1;

        question = `【分式方程】解方程：1/(x - ${b}) = ${a}`;
        const x = 1 / a + b;

        if (x === b) {
            answer = '增根，无解';
        } else {
            answer = `x=${x}`;
        }

        hint = '去分母：两边同乘(x-b)，然后解整式方程，最后验根';
    } else {
        // 增根问题
        const b = Math.floor(Math.random() * 3) + 1;
        question = `【分式方程】方程 1/(x - ${b}) = 2/(x - ${b}) 的增根是？`;
        answer = `x=${b}`;
        hint = '增根：使分母为0的值，代入原分母检验';
    }

    return {
        question: question,
        answer: answer,
        hint: hint,
        type: type
    };
}

function checkFractionalEquationAnswer() {
    const answerInput = document.getElementById('fractionalEquation-answer');
    const resultDiv = document.getElementById('fractionalEquation-result');
    const feedbackDiv = document.getElementById('fractionalEquation-feedback');
    const hintDiv = document.getElementById('fractionalEquation-hint');
    const hintText = document.getElementById('fractionalEquation-hint-text');

    const userAnswer = answerInput.value.trim().replace(/\s+/g, '');
    const currentQuestion = fractionalEquationQuestions[currentFractionalEquationIndex];

    hintText.textContent = currentQuestion.hint;
    hintDiv.style.display = 'block';

    const correctAnswer = currentQuestion.answer.replace(/\s+/g, '');
    let isCorrect = false;

    if (userAnswer === correctAnswer ||
        (userAnswer.includes(correctAnswer) && correctAnswer.length > 2)) {
        isCorrect = true;
    }

    if (isCorrect) {
        resultDiv.textContent = '✓ 正确！';
        resultDiv.className = 'result correct';
        feedbackDiv.innerHTML = getFractionalEquationFeedback();
        feedbackDiv.classList.add('show');
    } else {
        resultDiv.textContent = '✗ 错误，请再试试';
        resultDiv.className = 'result incorrect';
        feedbackDiv.classList.remove('show');
    }
}

function getFractionalEquationFeedback() {
    return `
        <div class="feedback-title">📚 分式方程知识点讲解</div>

        <div class="knowledge-section">
            <h4>🎯 分式方程解法：</h4>
            <p><strong>1. 去分母：</strong>两边同乘最简公分母</p>
            <p><strong>2. 解整式方程：</strong>转化为一元一次或一元二次方程</p>
            <p><strong>3. 验根：</strong>代入原分母检验</p>
        </div>

        <div class="knowledge-section">
            <h4>🎯 增根问题：</h4>
            <p><strong>1. 定义：</strong>去分母后产生的根，使原分母为0</p>
            <p><strong>2. 判断：</strong>代入最简公分母，结果为0则增根</p>
            <p><strong>3. 处理：</strong>舍去增根</p>
        </div>

        <div class="tip-box">
            <strong>⚡ 快速掌握技巧：</strong><br>
            <strong>必须验根！</strong>分母≠0<br>
            <strong>验根两步：</strong>先看分母是否为0，再看是否满足原方程<br><br>
            <strong>记忆口诀：</strong>"去分母，解方程，验根不能忘"
        </div>
    `;
}

// ==================== 解直角三角形模块 ====================

function generateRightTriangleQuestionData() {
    const types = ['三角函数', '边角关系', '特殊角'];
    const type = types[Math.floor(Math.random() * types.length)];

    let question, answer, hint;

    if (type === '三角函数') {
        const angles = ['sin', 'cos', 'tan'];
        const angleType = angles[Math.floor(Math.random() * angles.length)];
        question = `【解直角三角形】已知∠A=30°，斜边=10，则${angleType}30°=？`;

        const values = {
            'sin': '1/2',
            'cos': '√3/2',
            'tan': '√3/3'
        };

        answer = values[angleType];
        hint = '特殊角三角函数值：sin30°=1/2, cos30°=√3/2, tan30°=√3/3';
    } else if (type === '边角关系') {
        const hypotenuse = Math.floor(Math.random() * 5) + 5;
        question = `【解直角三角形】已知∠A=30°，斜边=${hypotenuse}，则∠A的对边=？`;

        const opposite = hypotenuse * Math.sin(30 * Math.PI / 180);
        answer = `${opposite}`;
        hint = '对边 = 斜边 × sinA';
    } else {
        // 特殊角值
        const angles = ['sin30°', 'sin45°', 'sin60°', 'cos30°', 'cos45°', 'cos60°', 'tan30°', 'tan45°', 'tan60°'];
        const angle = angles[Math.floor(Math.random() * angles.length)];

        const values = {
            'sin30°': '1/2',
            'sin45°': '√2/2',
            'sin60°': '√3/2',
            'cos30°': '√3/2',
            'cos45°': '√2/2',
            'cos60°': '1/2',
            'tan30°': '√3/3',
            'tan45°': '1',
            'tan60°': '√3'
        };

        question = `【解直角三角形】${angle} 的值是？`;
        answer = values[angle];
        hint = '特殊角三角函数值需要记忆';
    }

    return {
        question: question,
        answer: answer,
        hint: hint,
        type: type
    };
}

function checkRightTriangleAnswer() {
    const answerInput = document.getElementById('rightTriangle-answer');
    const resultDiv = document.getElementById('rightTriangle-result');
    const feedbackDiv = document.getElementById('rightTriangle-feedback');
    const hintDiv = document.getElementById('rightTriangle-hint');
    const hintText = document.getElementById('rightTriangle-hint-text');

    const userAnswer = answerInput.value.trim().replace(/\s+/g, '');
    const currentQuestion = rightTriangleQuestions[currentRightTriangleIndex];

    hintText.textContent = currentQuestion.hint;
    hintDiv.style.display = 'block';

    const correctAnswer = currentQuestion.answer.replace(/\s+/g, '');
    let isCorrect = false;

    if (userAnswer === correctAnswer ||
        (userAnswer.includes(correctAnswer) && correctAnswer.length > 1)) {
        isCorrect = true;
    }

    if (isCorrect) {
        resultDiv.textContent = '✓ 正确！';
        resultDiv.className = 'result correct';
        feedbackDiv.innerHTML = getRightTriangleFeedback();
        feedbackDiv.classList.add('show');
    } else {
        resultDiv.textContent = '✗ 错误，请再试试';
        resultDiv.className = 'result incorrect';
        feedbackDiv.classList.remove('show');
    }
}

function getRightTriangleFeedback() {
    return `
        <div class="feedback-title">📚 解直角三角形知识点讲解</div>

        <div class="knowledge-section">
            <h4>🎯 锐角三角函数：</h4>
            <p><strong>1. sinA（正弦）= 对边/斜边</strong></p>
            <p><strong>2. cosA（余弦）= 邻边/斜边</strong></p>
            <p><strong>3. tanA（正切）= 对边/邻边</strong></p>
        </div>

        <div class="knowledge-section">
            <h4>🎯 特殊角三角函数值：</h4>
            <p><strong>30°：</strong>sin=1/2, cos=√3/2, tan=√3/3</p>
            <p><strong>45°：</strong>sin=√2/2, cos=√2/2, tan=1</p>
            <p><strong>60°：</strong>sin=√3/2, cos=1/2, tan=√3</p>
        </div>

        <div class="knowledge-section">
            <h4>🎯 解直角三角形：</h4>
            <p><strong>1. 已知两边：</strong>用勾股定理求第三边</p>
            <p><strong>2. 已知一边一角：</strong>用三角函数求其他边</p>
            <p><strong>3. 关键：</strong>找对边、邻边、斜边</p>
        </div>

        <div class="tip-box">
            <strong>⚡ 快速掌握技巧：</strong><br>
            <strong>记忆方法：</strong>"对边是sin，邻边是cos，对邻比是tan"<br>
            <strong>画图！</strong>标记已知量和未知量<br><br>
            <strong>记忆口诀：</strong>"sin对斜，cos邻斜，tan对邻"
        </div>
    `;
}

// ==================== 三角形全等模块 ====================

function generateCongruentQuestionData() {
    const types = ['判定', '性质', '证明'];
    const type = types[Math.floor(Math.random() * types.length)];

    let question, answer, hint;

    if (type === '判定') {
        const methods = ['SSS', 'SAS', 'ASA', 'AAS', 'HL'];
        const method = methods[Math.floor(Math.random() * methods.length)];

        if (method === 'SSS') {
            question = '【三角形全等】已知：AB=DE, AC=DF, BC=EF。判定：△ABC≌△DEF的依据是？';
        } else if (method === 'SAS') {
            question = '【三角形全等】已知：AB=DE, AC=DF, ∠A=∠D。判定：△ABC≌△DEF的依据是？';
        } else if (method === 'ASA') {
            question = '【三角形全等】已知：∠A=∠D, ∠B=∠E, AB=DE。判定：△ABC≌△DEF的依据是？';
        } else if (method === 'AAS') {
            question = '【三角形全等】已知：∠A=∠D, ∠B=∠E, BC=EF。判定：△ABC≌△DEF的依据是？';
        } else {
            question = '【三角形全等】已知：Rt△ABC和Rt△DEF中，AC=DF, BC=EF。判定：△ABC≌△DEF的依据是？';
        }

        answer = method;
        hint = '全等三角形判定方法';
    } else if (type === '性质') {
        question = '【三角形全等】若△ABC≌△DEF，则对应边和对应角有什么关系？';
        answer = '对应边相等，对应角相等';
        hint = '全等三角形的性质：对应元素都相等';
    } else {
        question = '【三角形全等】SSA能判定两个三角形全等吗？';
        answer = '不能';
        hint = 'SSA不能判定三角形全等（容易构造出反例）';
    }

    return {
        question: question,
        answer: answer,
        hint: hint,
        type: type
    };
}

function checkCongruentAnswer() {
    const answerInput = document.getElementById('congruent-answer');
    const resultDiv = document.getElementById('congruent-result');
    const feedbackDiv = document.getElementById('congruent-feedback');
    const hintDiv = document.getElementById('congruent-hint');
    const hintText = document.getElementById('congruent-hint-text');

    const userAnswer = answerInput.value.trim().replace(/\s+/g, '');
    const currentQuestion = congruentQuestions[currentCongruentIndex];

    hintText.textContent = currentQuestion.hint;
    hintDiv.style.display = 'block';

    const correctAnswer = currentQuestion.answer.replace(/\s+/g, '');
    let isCorrect = false;

    if (userAnswer === correctAnswer ||
        (userAnswer.includes(correctAnswer) && correctAnswer.length > 2)) {
        isCorrect = true;
    }

    if (isCorrect) {
        resultDiv.textContent = '✓ 正确！';
        resultDiv.className = 'result correct';
        feedbackDiv.innerHTML = getCongruentFeedback();
        feedbackDiv.classList.add('show');
    } else {
        resultDiv.textContent = '✗ 错误，请再试试';
        resultDiv.className = 'result incorrect';
        feedbackDiv.classList.remove('show');
    }
}

function getCongruentFeedback() {
    return `
        <div class="feedback-title">📚 三角形全等知识点讲解</div>

        <div class="knowledge-section">
            <h4>🎯 全等三角形判定：</h4>
            <p><strong>1. SSS（边边边）：三边对应相等</strong></p>
            <p><strong>2. SAS（边角边）：两边及夹角对应相等</strong></p>
            <p><strong>3. ASA（角边角）：两角及夹边对应相等</strong></p>
            <p><strong>4. AAS（角角边）：两角及其中一角的对边对应相等</strong></p>
            <p><strong>5. HL：直角三角形斜边和一条直角边对应相等</strong></p>
        </div>

        <div class="knowledge-section">
            <h4>🎯 全等三角形性质：</h4>
            <p><strong>1. 对应边相等</strong></p>
            <p><strong>2. 对应角相等</strong></p>
            <p><strong>3. 对应高、中线、角平分线相等</strong></p>
            <p><strong>4. 周长、面积相等</strong></p>
        </div>

        <div class="tip-box">
            <strong>⚡ 快速掌握技巧：</strong><br>
            <strong>记忆方法：</strong>"边边边、边角边、角边角、角角边、HL"<br>
            <strong>注意：</strong>SSA、AAA不能判定三角形全等<br><br>
            <strong>记忆口诀：</strong>"SSS SAS ASA AAS HL"
        </div>
    `;
}

// ==================== 平行四边形判定模块 ====================

function generateParallelogramQuestionData() {
    const types = ['判定', '特殊判定', '性质'];
    const type = types[Math.floor(Math.random() * types.length)];

    let question, answer, hint;

    if (type === '判定') {
        const methods = [
            '两组对边分别平行',
            '两组对边分别相等',
            '一组对边平行且相等',
            '对角线互相平分',
            '两组对角分别相等'
        ];
        const method = methods[Math.floor(Math.random() * methods.length)];

        question = `【平行四边形判定】已知：${method}。能否判定四边形ABCD是平行四边形？`;
        answer = '能';
        hint = '平行四边形的五种判定方法之一';
    } else if (type === '特殊判定') {
        const types_special = ['矩形', '菱形', '正方形'];
        const type_special = types_special[Math.floor(Math.random() * types_special.length)];

        if (type_special === '矩形') {
            question = '【平行四边形判定】平行四边形中，如果有一个角是直角，它是什么四边形？';
            answer = '矩形';
            hint = '有一个角是直角的平行四边形是矩形';
        } else if (type_special === '菱形') {
            question = '【平行四边形判定】平行四边形中，如果对角线互相垂直，它是什么四边形？';
            answer = '菱形';
            hint = '对角线互相垂直的平行四边形是菱形';
        } else {
            question = '【平行四边形判定】既是矩形又是菱形的四边形是什么？';
            answer = '正方形';
            hint = '正方形是矩形和菱形的综合体';
        }
    } else {
        question = '【平行四边形判定】平行四边形的对角线有什么性质？';
        answer = '互相平分';
        hint = '平行四边形的对角线互相平分';
    }

    return {
        question: question,
        answer: answer,
        hint: hint,
        type: type
    };
}

function checkParallelogramAnswer() {
    const answerInput = document.getElementById('parallelogram-answer');
    const resultDiv = document.getElementById('parallelogram-result');
    const feedbackDiv = document.getElementById('parallelogram-feedback');
    const hintDiv = document.getElementById('parallelogram-hint');
    const hintText = document.getElementById('parallelogram-hint-text');

    const userAnswer = answerInput.value.trim().replace(/\s+/g, '');
    const currentQuestion = parallelogramQuestions[currentParallelogramIndex];

    hintText.textContent = currentQuestion.hint;
    hintDiv.style.display = 'block';

    const correctAnswer = currentQuestion.answer.replace(/\s+/g, '');
    let isCorrect = false;

    if (userAnswer === correctAnswer ||
        (userAnswer.includes(correctAnswer) && correctAnswer.length > 1)) {
        isCorrect = true;
    }

    if (isCorrect) {
        resultDiv.textContent = '✓ 正确！';
        resultDiv.className = 'result correct';
        feedbackDiv.innerHTML = getParallelogramFeedback();
        feedbackDiv.classList.add('show');
    } else {
        resultDiv.textContent = '✗ 错误，请再试试';
        resultDiv.className = 'result incorrect';
        feedbackDiv.classList.remove('show');
    }
}

function getParallelogramFeedback() {
    return `
        <div class="feedback-title">📚 平行四边形判定知识点讲解</div>

        <div class="knowledge-section">
            <h4>🎯 平行四边形判定：</h4>
            <p><strong>1. 两组对边分别平行</strong></p>
            <p><strong>2. 两组对边分别相等</strong></p>
            <p><strong>3. 一组对边平行且相等</strong></p>
            <p><strong>4. 对角线互相平分</strong></p>
            <p><strong>5. 两组对角分别相等</strong></p>
        </div>

        <div class="knowledge-section">
            <h4>🎯 特殊平行四边形判定：</h4>
            <p><strong>矩形：</strong>有一个角是直角的平行四边形；对角线相等的平行四边形</p>
            <p><strong>菱形：</strong>四边相等的四边形；对角线垂直的平行四边形</p>
            <p><strong>正方形：</strong>既是矩形又是菱形</p>
        </div>

        <div class="knowledge-section">
            <h4>🎯 特殊平行四边形对角线性质：</h4>
            <p><strong>矩形：</strong>对角线相等</p>
            <p><strong>菱形：</strong>对角线垂直</p>
            <p><strong>正方形：</strong>对角线既相等又垂直</p>
        </div>

        <div class="tip-box">
            <strong>⚡ 快速掌握技巧：</strong><br>
            <strong>记忆方法：</strong>"边平行、边相等、对角平分"<br>
            <strong>特殊四边形：</strong>"矩形对角线相等，菱形对角线垂直，正方形都具备"<br><br>
            <strong>记忆口诀：</strong>"矩形等，菱形垂，正方形都具备"
        </div>
    `;
}

// ==================== 修改现有函数 ====================

// 修改 generateQuestionByType 函数
const originalGenerateQuestionByType = window.generateQuestionByType;

window.generateQuestionByType = function(type) {
    switch(type) {
        case 'function': return generateFunctionQuestionData();
        case 'moving': return generateMovingQuestionData();
        case 'transform': return generateTransformQuestionData();
        case 'quadratic': return generateQuadraticQuestionData();
        case 'equation': return generateEquationQuestionData();
        case 'inequality': return generateInequalityQuestionData();
        case 'probability': return generateProbabilityQuestionData();
        case 'geometry': return generateGeometryQuestionData();
        case 'expression': return generateExpressionQuestionData();
        case 'radical': return generateRadicalQuestionData();
        case 'quadEquation': return generateQuadEquationQuestionData();
        case 'fractionalEquation': return generateFractionalEquationQuestionData();
        case 'rightTriangle': return generateRightTriangleQuestionData();
        case 'congruent': return generateCongruentQuestionData();
        case 'parallelogram': return generateParallelogramQuestionData();
    }
};

// 修改 generateExamQuestions 函数
const originalGenerateExamQuestions = window.generateExamQuestions;

window.generateExamQuestions = function() {
    examQuestions = [];

    // 定义题目类型及分值
    const questionTypes = [
        { type: 'function', name: '函数图像', count: 2, points: 8 },
        { type: 'moving', name: '动点问题', count: 2, points: 10 },
        { type: 'transform', name: '坐标变换', count: 1, points: 6 },
        { type: 'quadratic', name: '二次函数', count: 2, points: 8 },
        { type: 'equation', name: '方程根', count: 2, points: 8 },
        { type: 'inequality', name: '不等式', count: 1, points: 6 },
        { type: 'probability', name: '概率', count: 1, points: 6 },
        { type: 'geometry', name: '几何证明', count: 1, points: 6 },
        { type: 'expression', name: '整式运算', count: 2, points: 8 },
        { type: 'radical', name: '二次根式', count: 2, points: 8 },
        { type: 'quadEquation', name: '一元二次方程', count: 2, points: 8 },
        { type: 'fractionalEquation', name: '分式方程', count: 2, points: 8 },
        { type: 'rightTriangle', name: '解直角三角形', count: 2, points: 8 },
        { type: 'congruent', name: '三角形全等', count: 2, points: 8 },
        { type: 'parallelogram', name: '平行四边形判定', count: 2, points: 8 }
    ];

    let questionIndex = 0;

    questionTypes.forEach(qt => {
        for (let i = 0; i < qt.count; i++) {
            const question = generateQuestionByType(qt.type);
            examQuestions.push({
                ...question,
                index: questionIndex++,
                typeName: qt.name,
                points: qt.points,
                flagged: false
            });
        }
    });

    // 更新导航
    updateExamNav();
};

console.log('✅ 新模块加载完成！');
