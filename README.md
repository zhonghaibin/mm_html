# mm-html
```
node 版本
v17.2.0
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### ui组件
See http://v2.iviewui.com/docs/guide/install

### 打包docker镜像
```
 docker build -t mm_html:1.0 -f Dockerfile .

 docker run --name=mm_html -d -p 8080:80 mm_html:1.0
```


###  推送到docker仓库
```
 docker tag  mm_html:1.0  zhonghaibin/mm_html:1.0
 
 docker login

 docker push  zhonghaibin/mm_html:1.0

 docker run --name=mm_html -d -p 8080:80  zhonghaibin/mm_html:1.0
```
