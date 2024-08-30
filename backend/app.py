from flask import Flask, request, jsonify
import openai
import pandas as pd

app = Flask(__name__)

openai.api_key = 'sk-tQMSpFaulMtvyTG-7WDuuPxECRZem0GGE8yDj4dlj6T3BlbkFJk1kuDTeJ1jJDsq5QZUSEnJyPeR4EXGB1mfAMH2lHIA'
# df = pd.read_csv('restaurant.csv')
context = []
@app.route('/chat', methods=['POST'])
def chat():
    print('This is in app route')
    user_message = request.json.get('message')

    # Define the chatbot's interaction rules here
    
    rules = """
    သင်သည် စားသောက်ဆိုင်ရှိ စားပွဲထိုးစက်ရုပ်အတွက် ပကတိလက်ထောက်တစ်ဦးဖြစ်သည်။ \
    ခင်မင်ရင်းနှီးပြီး အချိန်တိုင်း ကူညီပေးပါ။ \
    ဖောက်သည်များအား ဖော်ရွေပျူငှာစွာ ကြိုဆိုပြီး ယနေ့ သူတို့ကို သင် မည်သို့ ကူညီပေးနိုင်သည်ကို မေးမြန်းပါ။ \
    ဖော်ပြချက်များ၊ ပါဝင်ပစ္စည်းများနှင့် ဈေးနှုန်းများအပါအဝင် မီနူးတွင် အချက်အလက်များကို ပေးဆောင်ပါ။ \
    ဝယ်ယူသူများသည် မည်သည့်မှာယူရမည်ကို မသေချာပါက၊ လူကြိုက်များသောပစ္စည်းများ သို့မဟုတ် ၎င်းတို့၏ယခင်မှာယူမှုများအပေါ်အခြေခံ၍ အကြံပြုချက်များပေးပါ။ \
    ဖောက်သည်တစ်ဦးသည် ပစ္စည်းတစ်ခုကို ရွေးချယ်ပြီးသည်နှင့်၊ ၎င်းတို့၏ ရွေးချယ်မှုကို အတည်ပြုပြီး ၎င်းတို့၏ မှာယူမှုတွင် ပစ္စည်းများ ထပ်ထည့်လိုသလားဟု မေးမြန်းပါ။ \
    Fမှာယူမှုစုံစမ်းမေးမြန်းမှုများကို စီမံခန့်ခွဲရန်အတွက် ပြင်ဆင်မှု၊ ပေးပို့မှုနှင့် ခန့်မှန်းပေးပို့ချိန်အပါအဝင် မှာယူမှုအခြေအနေဆိုင်ရာ အပ်ဒိတ်များကို ပေးဆောင်ပါ။ \
    ဘေလ်တောင်းခံသည့်အခါ အရေအတွက်၊ အမည်၊ စျေးနှုန်းနှင့် ပေးချေရမည့် စုစုပေါင်းပမာဏအပါအဝင် ရွေးချယ်ထားသောပစ္စည်းများ၏ အကျဉ်းချုပ်ကို ပေးဆောင်ပါ။ \
    ဖောက်သည်အား ၎င်းတို့၏ငွေပေးချေမှုကို အပြီးသတ်ရန် လိုအပ်သည့်အဆင့်များမှတစ်ဆင့် ငွေပေးချေမှုလုပ်ဆောင်ခြင်းကို ကိုင်တွယ်ပါ။ \
    ပြဿနာများ သို့မဟုတ် အထူးတောင်းဆိုမှုများရှိပါက ၎င်းတို့ကို ချက်ချင်းဖြေရှင်းပြီး ဖြေရှင်းချက် သို့မဟုတ် အခြားရွေးချယ်စရာများကို ပေးဆောင်ပါ။ \
    သူတို့ ဘာမှ မတောင်းဆိုရင် သူတို့ကို နှုတ်ဆက်ပြီး အမိန့်အတည်ပြုပေးဖို့ တောင်းဆိုပါ။
    """

    # Context for the conversation
    context = [{'role': 'system', 'content': rules}, {'role': 'user', 'content': user_message}]
    print("This is openai",openai)
    # Fetch the response from OpenAI
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # You can use "gpt-3.5-turbo" if GPT-4 is not available
        messages=context,
        temperature=0.7,
    )

    chatbot_reply = response.choices[0].message["content"]
    print('Test :',response.choices[0].message["content"])

    return jsonify({"response": chatbot_reply})

if __name__ == '__main__':
    print('server started..')
    app.run(host='0.0.0.0', port=5000,debug=True)

# @app.route('/ping', methods=['GET'])
# def ping():
#     return "pong"

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)
