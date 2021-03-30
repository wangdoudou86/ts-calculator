{
    class Calculator {
        public n1: string = ''
        public n2: string = ''
        public operator: string = ''
        public result: string = ''
        public container: HTMLDivElement 
        public resultSpan: HTMLSpanElement 
        public keys: Array<Array<string | number>> = [
            ['Clear', '÷'],
            [7, 8, 9, '×'],
            [4, 5, 6, '-'],
            [1, 2, 3, '+'],
            [0, '.', '='],
        ]

        constructor(){
            this.createContainer()
            this.createOutput()
            this.generateText()
            this.bindEvents()
        }

        createContainer(){
            //创建容器
            let calc = document.createElement('div');
            calc.classList.add('calc');
            document.body.appendChild(calc);
            this.container = calc
        }

        createOutput(){
             // 创建结果界面
            let output = document.createElement('div');
            output.classList.add('output')
            let resultSpan = document.createElement('span');
            output.appendChild(resultSpan)
            resultSpan.textContent = '0'
            this.resultSpan = resultSpan
            this.container.appendChild(output)
        }
        // 生成button元素
        createButton(text: string | number, container: HTMLElement, className?: string){
            let button: HTMLButtonElement = document.createElement('button')
            // 放进button里的都是字符串
            button.textContent = text.toString()
            className && button.classList.add(className)
            container.appendChild(button)
        }

        generateText(){
            // 循环创建键盘按钮
            this.keys.forEach((textList: Array<string | number>)=>{
                let div: HTMLElement = document.createElement('div')
                div.classList.add('row')
                textList.forEach((text: string | number)=>{
                    this.createButton(text, div, `text-${text}`)
                })
                this.container.appendChild(div)
            })
        }

        bindEvents(){
            // 添加事件监听
            this.container.addEventListener('click', event => {
                if(event.target instanceof HTMLButtonElement){
                    const text = event.target.textContent
                    if('0123456789.'.indexOf(text) >= 0){
                        if( this.operator){
                            this.n2 =  this.n2 + text
                            this.resultSpan.textContent =  this.n2
                        }else{
                            this.result = ''
                             this.n1 =  this.n1 + text
                             this.resultSpan.textContent =  this.n1
                        }
                    }else if('+-×÷'.indexOf(text) >= 0){
                        if( this.result){
                             this.n1 =  this.result
                             this.result = ''
                        }
                        this.operator = text
                    }else if('='.indexOf(text) >= 0){
                         this.result = this.getRusult( this.n1,  this.n2,  this.operator)
                         this.resultSpan.textContent =  this.result
                         this.n1 = ''
                         this.n2 = ''
                         this.operator = ''
                    }else if(text === 'Clear'){
                         this.n1 = '';
                         this.n2 = '';
                         this.operator = '';
                         this.result = '0';
                         this.resultSpan.textContent =  this.result
                    }
                    
                }
            })
        }

        getRusult(n1: string, n2: string, operator: string): string{
            let numberN1: number = parseFloat(n1)
            let numberN2: number = parseFloat(n2)
            if(operator === '+'){
                return (numberN1 + numberN2).toPrecision(12)
            }else if(this.operator === '-'){
                return (numberN1 - numberN2).toPrecision(12)
            }else if(this.operator === '×'){
                return (numberN1 * numberN2).toPrecision(12)
            }else if(this.operator === '÷'){
                return (numberN1 / numberN2).toPrecision(12)
            }
        }

    }
    new Calculator()
}