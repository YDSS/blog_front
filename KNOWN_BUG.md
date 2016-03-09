# Known Bugs

- diary的reducer使用curKey来跟踪当前日历所在的年和月，curKey同时也是取list相应年月日记数组的key，而这个key在upload时是不需要的，
    其实diary的文件名已经统一了格式，可以直接通过文件名解析出年和月，不需要curKey
