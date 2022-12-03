document.addEventListener('DOMContentLoaded',function(){
    
    fetch('https://open.er-api.com/v6/latest/USD')
        .then(data=>data.json())
        .then((data)=>{
            let val_from, val_to,uc_val, acutal_val, uval;
            let currency_from,currency_to;
            const CurCode = Object.keys(data.rates);
            CurCode.map(function(key){
                const option = document.createElement('option');
                option.value = key;
                option.innerHTML = key;
                const ele = document.querySelector('#cur_from').append(option);
            })
            CurCode.map(function(key){
                const option = document.createElement('option');
                option.innerHTML = key;
                const ele = document.querySelector('#cur_to').append(option);
            })
            
            document.querySelector('#cur_from').onchange = function(){
                currency_from = this.value;
                val_from = data.rates["USD"]/data.rates[(this.value)];
            }
            document.querySelector('#cur_to').onchange = function(){
                currency_to = this.value;
                val_to = data.rates[(this.value)];
                uc_val = (val_from*val_to);
            }
            document.querySelector('#btn').onclick = function(){
                    uval = parseInt(document.querySelector('#uinput').value);
                    acutal_val=(uval * uc_val).toFixed(2);
                    document.querySelector('pre').innerHTML = `${acutal_val} ${currency_to}`;
                    const li = document.createElement('li');
                    li.innerHTML = `${uval} ${currency_from} is equal to ${acutal_val} ${currency_to}`
                    document.querySelector('ul').append(li);
                    document.querySelector('#uinput').value="";
                    // document.querySelector('#res').value = "";
                    document.querySelector('#cur_from').value="--select--";
                    document.querySelector('#cur_to').value = "--select--";
                    uval="";
                    currency_from="";
                    currency_to="";
                    acutal_val = "";
            }
            

        })
    
    
})

