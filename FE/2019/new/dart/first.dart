class Test{
  String name;
  num age;
  Test(String _name,num _age){
    name=_name;
    age=_age;
  }
  void show(){
    print('''
      xr 
      ${this.name}
      ${this.age}
    ''');
  }
}
void testArgs(String name,[num age,bool sex]){
  print('${name}-${age}-${sex}');
}
void testDefaultArgs(String name,{num age=31,bool sex=true}){
  print('${name}-${age}-${sex}');
}
void main(){
  final Test t=new Test('gjj',32);
  Test s;
  t.show();
  t?.show();
  s?.show();
  List<num> list=[1,2,3];
  Map<String,num> m={
    'a':1
  };
  print(m['c']);
  testArgs('gjj');
  testDefaultArgs('gjj');
  String noneValue;
  //bool除了true其他都会转换为false 所以此处不宜用三元
  noneValue=noneValue??'a';
  print(noneValue);
}