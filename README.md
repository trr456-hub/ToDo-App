# ToDo-App
## 배포URL
https://expo.dev/@seokgeun/ToDo-App
## 구동화면
<img src="https://user-images.githubusercontent.com/108771927/218752328-925b74a1-d199-423c-92b6-bed99a3e36ab.gif">

# Information
## ObjectAssign
#### ObjectAssign 은 Object를 가져다 다른 Object와 합쳐준다.
#### 그런 다음 새로운 Object 를 return 해준다.

### Object.assign 예제
    > const toDos = {}
    < undefined
    > toDos[Date.now()] = {work:false}
    < {work: false}
    > toDos
    < {1676355955658: {work: false}}
    > Object.assign({}, toDos, {[Date.now()]:{work:true}})
    < {1676355955658: {work: false}, 1676356208556: {work: true}}
##### 오브젝트를 하나로 묶어줌

## 비동기 localStorage 사용
#### npx expo install @react-native-async-storage/async-storage
## Icon
#### https://icons.expo.fyi

https://drive.google.com/drive/folders/1SjttgitCBx9qHDeMAoOxNLCRKc6z9Fjk?usp=drive_link
