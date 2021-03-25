{
    //初始化数据
    let n1: string = '';
    let n2: string = '';
    let operator: string = '';
    let result: string = '';
    
    
    //创建容器
    let calc = document.createElement('div');
    calc.classList.add('calc');
    document.body.appendChild(calc);

    // 创建结果界面
    let output = document.createElement('div');
    output.classList.add('output')
    let resultSpan = document.createElement('span');
    resultSpan.textContent = '0'
    output.appendChild(resultSpan)
    calc.appendChild(output)
    
    // 创建按钮
    function createButton(text: string | number, container: HTMLElement, className?: string){
        let button: HTMLButtonElement = document.createElement('button')
        // 放进button里的都是字符串
        button.textContent = text.toString()
        className && button.classList.add(className)
        container.appendChild(button)
    }

    // 声明按钮上的内容
    let keys: Array<Array<string | number>> = [
        ['Clear', '÷'],
        [7, 8, 9, '×'],
        [4, 5, 6, '-'],
        [1, 2, 3, '+'],
        [0, '.', '='],
    ]
    
    // 循环创建键盘按钮
    keys.forEach((textList: Array<string | number>)=>{
        let div: HTMLElement = document.createElement('div')
        div.classList.add('row')
        textList.forEach((text: string | number)=>{
            createButton(text, div, `text-${text}`)
        })
        calc.appendChild(div)
    })
    // 计算
    function getRusult(n1: string, n2: string, operator: string): string{
        let numberN1: number = parseInt(n1)
        let numberN2: number = parseInt(n2)
        if(operator === '+'){
            return (numberN1 + numberN2).toString()
        }else if(operator === '-'){
            return (numberN1 - numberN2).toString()
        }else if(operator === '×'){
            return (numberN1 * numberN2).toString()
        }else if(operator === '÷'){
            return (numberN1 / numberN2).toString()
        }
    }

    // 添加事件监听
    calc.addEventListener('click', event => {
        if(event.target instanceof HTMLButtonElement){
            const text = event.target.textContent
            if('0123456789'.indexOf(text) >= 0){
                if(operator){
                    n2 = n2 + text
                    resultSpan.textContent = n2
                }else{
                    result = ''
                    n1 = n1 + text
                    resultSpan.textContent = n1
                }
            }else if('+-×÷'.indexOf(text) >= 0){
                if(result){
                    n1 = result
                    result = ''
                }
                operator = text
            }else if('='.indexOf(text) >= 0){
                result = getRusult(n1, n2, operator)
                resultSpan.textContent = result
                n1 = ''
                n2 = ''
                operator = ''
            }else if(text === 'Clear'){
                n1 = '';
                n2 = '';
                operator = '';
                result = '0';
                resultSpan.textContent = result
            }
            
        }
    })

}