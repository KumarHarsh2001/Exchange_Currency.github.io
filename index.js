// Load all DOM content to the web
document.addEventListener('DOMContentLoaded',function(){
    // fetch exchange rate api for from below link.
        fetch('https://open.er-api.com/v6/latest/USD')
        .then(data=>data.json())
        .then((data)=>{
            /*
            cur_from :- Select Cuurency from which we need to convert.
            cur_to :- Select Cuurency in which we need to convert.
            val_from :- Convert all currency value into USD value.  
            val_to :- select value of currency from Data in which we need to convert.
            uval :- select value taken from user.
            uc_val :- Calculated only currency value with all decimal places.
            actual_val :- Calculated user_value(uval) and uc_val with all decimal places.
            */
            let val_from, val_to,uc_val, acutal_val,uval;
            let currency_from,currency_to;
            const CurCode = Object.keys(data.rates);
            CurCode.map(function(key){
                const option = document.createElement('option');
                option.value = key;
                option.innerHTML = key;
                document.querySelector('#cur_from').append(option);
            })
            CurCode.map(function(key){
                const option = document.createElement('option');
                option.innerHTML = key;
                document.querySelector('#cur_to').append(option);
            })
            // 
            document.querySelector('#cur_from').onchange = function(){
                currency_from = this.value;
                val_from = data.rates["USD"]/data.rates[(this.value)];
            }

            document.querySelector('#cur_to').onchange = function(){
                currency_to = this.value;
                val_to = data.rates[(this.value)];
                uc_val = (val_from*val_to);
            }
            document.querySelector('#btn').disabled = true;
            document.querySelector('#uinput').onkeyup = function(){
                if(document.querySelector('#uinput').value.length !== 0){
                document.querySelector('#btn').disabled = false;
                document.querySelector('#btn').onclick = function(){
                    uval = parseInt(document.querySelector('#uinput').value);
                    acutal_val=(uval * uc_val);
                    document.querySelector('#res').innerHTML = `1 ${currency_from} = ${uc_val.toFixed(6)} ${currency_to}`;
                    const li = document.createElement('li');
                    li.innerHTML = `${uval} ${currency_from} is equal to ${acutal_val} ${currency_to}`
                    document.querySelector('ul').prepend(li);
                    document.querySelector('#uinput').value="";
    
                    document.querySelector('#cur_from').value="--select--";
                    document.querySelector('#cur_to').value = "--select--";
                    uc_val = 0;
                    uval="";
                    currency_from="";
                    currency_to="";
                    acutal_val = "";
                    document.querySelector('#btn').disabled = true;
                } 
                }
                // else{
                //     console.log("press");
                // }
            }
            })

    
})

