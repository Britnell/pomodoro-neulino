lets create a pomodoro app with neutralinojs

it will have following states :

- idle
- press 'start' button to begin work interval 40 mins
- in during work interval can pause and resume
- when time runs out it continues to count into negative, counting the 'overtime'
- when time has run out a button appears to 'start break'
- in break as above can pause and resume and it counts into negative when time is out
- when time is <=0 then a button appears to 'finish' cycle, this increases a counter of finished cycles, and returns to idle state
- when timer is paused there also appears a 'reset' button to return to idle
