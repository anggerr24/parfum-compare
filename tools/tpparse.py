import re, json, sys
sys.stdout.reconfigure(encoding="utf-8")

STR = r'"((?:[^"\\]|\\.)*)"'


def jstr(raw):
    try:
        return json.loads('"%s"' % raw)
    except Exception:
        return raw


for i in sys.argv[1:]:
    s = open(f'tp/{i}.html', encoding='utf8').read()
    title = re.search(r'<title>([^<]*)', s)
    desc = None
    for m in re.finditer(r'"(?:description|content)":' + STR, s):
        t = jstr(m.group(1))
        if len(t) > 80 and re.search(r'(?i)notes', t):
            desc = t
            break
    price = re.search(r'"priceFmt":"([^"]+)"', s)
    imgs = re.findall(r'"(?:urlOriginal|URLMaxRes)":"(https:[^"]+)"', s)
    print('=====', i, title.group(1) if title else '-', '|', price.group(1) if price else '-')
    print('IMG', jstr(imgs[0]) if imgs else '-')
    print((desc or '-')[:1500])
