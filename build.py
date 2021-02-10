#!/usr/bin/env python3

def transferReactBuildToDjango(source, target, firstDelimiter, firstIndexShift, secondDelimiter, secondIndexShift):
    with open(source, 'r') as f:
        data = f.read()
        index1 = data.find(firstDelimiter) + firstIndexShift
        index2 = data.find(secondDelimiter) + secondIndexShift

    with open(target, 'w') as f:
        f.write(data[index1:index2])


transferReactBuildToDjango('frontend-react/build/index.html', 'backend-django/templates/react/js.html',
                           '</div><script>', len('</div>'), '</script></body>', len('</script>'))
transferReactBuildToDjango('frontend-react/build/index.html', 'backend-django/templates/react/js_add.html',
                           '</body><script', len('</body>'), '</script></html>', len('</script>'))
transferReactBuildToDjango('frontend-react/build/index.html',
                           'backend-django/templates/react/head.html', '<head>', len('<head>'), '</head>', 0)
