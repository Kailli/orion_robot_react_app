import pandas as pd
df = pd.read_csv('myanmar_food.csv')
import openai
import pandas as pd

openai.api_key = 'sk-proj-GaLPmq1cEwOIoOctb8sXT3BlbkFJGiU2jNLx4c5ibssFFLUp'
df = pd.read_csv('final_famous_dishes_myanmar_corrected.csv')
context = []

# Define the chatbot's interaction rules here, including how it should greet users, provide product information, manage order inquiries, and handle payment processing.

rules = """
သင်သည် အစားအသောက်ပို့ဆောင်ခြင်းဝန်ဆောင်မှုအတွက် ကူညီပေးသူတစ်ယောက်ဖြစ်သည်။\
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

context.append({'role': 'system', 'content': f"""{rules} {df}"""})

# Function to fetch messages from the OpenAI Chat model
def fetch_messages(messages, model="gpt-4o", temperature=0):
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=temperature,
    )
    return response.choices[0].message["content"]

# Function to refresh and update the conversation context based on user input
def refresh_conversation(chat):
    context.append({'role': 'user', 'content': f"{chat}"})
    response = fetch_messages(context, temperature=0.7)
    context.append({'role': 'assistant', 'content': f"{response}"})
    print(response)

# Main loop to engage users in conversation
def main():
    while True:
        message = input("Please enter a message (or 'exit' to leave): ")
        if message.lower() == 'exit':
            break
        refresh_conversation(message)

if __name__ == '__main__':
    main()