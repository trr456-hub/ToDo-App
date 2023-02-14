# ToDo-App

# Information
## ObjectAssign
#### ObjectAssign 은 Object를 가져다 다른 Object와 합쳐준다.
#### 그런 다음 새로운 Object 를 return 해준다.

### Object.assign 예제

    > const toDos = {}'''
    < undefined'''
    > toDos[Date.now()] = {work:false}
    < {work: false}
    > toDos
    < {1676355955658: {work: false}}
    > Object.assign({}, toDos, {[Date.now()]:{work:true}})
    < {1676355955658: {work: false}, 1676356208556: {work: true}}
    
##### 오브젝트를 하나로 묶어줌
