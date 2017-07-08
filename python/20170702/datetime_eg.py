from datetime import datetime,timedelta
today=datetime.today()
print(today,today.year,today.month,today.day,today.date(),today.hour,today.minute,today.second,today.time())
nextday=datetime(2017,7,9)
dur=nextday-today
print(dur.days,dur.seconds)
tom=today+timedelta(days=1,seconds=2,hours=2)
print(tom)