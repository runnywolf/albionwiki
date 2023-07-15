import os, json

version = "v1.4.dev-1 -&gt; Last update date: 2023/7/14"
wiki_url = "https://runnywolf.github.io/albionwiki"
# wiki_url = ".."

def read_json(path):
  with open(path, mode="r", encoding="utf-8") as f:
    data = json.load(f)
  return data

def get_folder_file_name(path, file_type):
  l_file = []
  for root, dirs, files in os.walk(path):
    l_file.extend(file for file in files if file.endswith(".%s"%file_type))
  return l_file

def str_cut_substr(str, substr1, substr2):
  return str.split(substr1)[1].split(substr2)[0]

def page_insert(s_temp, s_page, page_name):
  s_temp = str(s_temp)
  
  s_temp = s_temp.replace("$pyINSERT_iconURL$", "%s/image/icon.webp"%wiki_url)
  
  s_css = ""
  for file_name in get_folder_file_name("CSS", "css"):
    s_css += '\n    <link rel="stylesheet" type="text/css" href="%s/tool/CSS/%s">'%(wiki_url, file_name)
  s_temp = s_temp.replace("$pyINSERT_CSS$", s_css)
  
  s_temp = s_temp.replace("$pyINSERT_jsURL_jquery$", "%s/tool/JS/jquery-3.6.4.js"%wiki_url)
  s_temp = s_temp.replace("$pyINSERT_jsURL_main$", "%s/tool/JS/albionwiki.js"%wiki_url)
  if "%s.js"%page_name in get_folder_file_name("JS/page", "js"):
    s_temp = s_temp.replace("$pyINSERT_pageJS$", '\n    <script src="%s/tool/JS/page/%s.js"></script>'%(wiki_url, page_name))
  else:
    s_temp = s_temp.replace("$pyINSERT_pageJS$", "")
  
  s_temp = s_temp.replace("$pyINSERT_bgURL$", "%s/image/bg.webp"%wiki_url)
  
  s_temp = s_temp.replace("$pyINSERT_headIconURL$", "%s/image/icon.webp"%wiki_url)
  
  s_contents = ""
  for group in group_data:
    s_contents += '<div class="main-contents-group">%s(%d)</div>'%(group["groupName"], len(group["a_page"]))
    
    s_contents += '<div class="main-contents-link">'
    for page in group["a_page"]:
      s_red_style = ""
      if (page["pageName"] == page_name):
        s_red_style = 'class="red"'
      s_contents += '<div><a %shref="%s/page/%s">%s</a></div>'%(s_red_style, wiki_url, page["pageName"], page["title"])
    
    s_contents += '</div>'
  s_temp = s_temp.replace('$pyINSERT_contents$', s_contents)
  
  if (page_name == "main_menu"):
    s_article = '<div class="main-article-title-h1" style="text-align:center;">頁面清單</div>'
    for group in group_data:
      s_article += '<div class="main-article-paragraph">'
      s_article += '<div class="menu-title">%s(%d)</div>'%(group["groupName"], len(group["a_page"]))
      s_article += '<div class="menu-list">'
      for page in group["a_page"]:
        s_article += '<div><a href="https://runnywolf.github.io/albionwiki/page/%s">%s</a>&nbsp;<span class="red">&gt;</span>&nbsp;%s</div>'%(page["pageName"], page["title"], page["info"])
      s_article += '</div>'
      s_article += '</div>'
  else:
    s_article = str_cut_substr(s_page, '<div class="main-article">', '<div class="main-error" id="main-error">')
    s_article = "</div>".join(s for s in s_article.split("</div>")[:-1])
  s_temp = s_temp.replace("$pyINSERT_article$", s_article)
  
  s_temp = s_temp.replace("$pyINSERT_discordIcon$", "%s/image/discord_icon.webp"%wiki_url)
  
  s_temp = s_temp.replace("$pyINSERT_version$", version)
  
  return s_temp

def page_update(page_path, page_name=""):
  with open(page_path, mode="r", encoding="utf-8") as f:
    s_page = f.read()
  with open(page_path, mode="w", encoding="utf-8") as f:
    f.write(page_insert(s_template, s_page, page_name))

def get_file_word_count(path):
  with open(path, mode="r", encoding="utf-8") as f:
    s_page = f.read()
  s_page = s_page.replace(" ", "").replace("\t", "").replace("\n", "")
  return len(s_page)

def get_article_word_count(path):
  with open(path, mode="r", encoding="utf-8") as f:
    s_page = f.read()
  s_page = str_cut_substr(s_page, '<div class="main-article">', '<div class="main-error" id="main-error">')
  s_page = "</div>".join(s for s in s_page.split("</div>")[:-1])
  s_page = s_page.replace(" ", "").replace("\t", "").replace("\n", "")
  return len(s_page)

def make_bar():
  bar_width = 500
  
  c_html_temp = get_file_word_count("template.html")
  
  c_html_page = sum(get_article_word_count("../%s.html"%path) for path in ("index", "menu", "update"))
  c_html_page += sum(get_article_word_count("../page/%s"%path) for path in get_folder_file_name("../page", "html"))
  
  c_css = sum(get_file_word_count("CSS/%s"%path) for path in get_folder_file_name("CSS", "css"))
  
  c_js_main = get_file_word_count("JS/albionwiki.js")
  
  c_js_page = sum(get_file_word_count("JS/page/%s"%path) for path in get_folder_file_name("JS/page", "js"))
  
  c_py = get_file_word_count("insert.py")
  
  c_sum = c_html_temp+c_html_page+c_css+c_js_main+c_js_page+c_py
  
  s_html = '<div class="flex-start" style="margin-top:2px;">'
  a_c = [c_html_temp, c_html_page, c_css, c_js_main, c_js_page, c_py]
  a_color = ["c00", "f00", "d0d", "090", "0c0", "66f"]
  s_html += '<table class="Xbar">'
  s_html += '<tr>'
  for i in range(6):
    s_html += '<td style="width:%.2fpx; background-color:#%s;" title="%s ( %.02f%% )" ></td>'%(
      a_c[i]/c_sum*bar_width, a_color[i], "{:,}".format(a_c[i]), a_c[i]/c_sum*100
    )
  s_html += '</tr>'
  s_html += '</table>'
  s_html += '<span style="margin:4px 0 0 4px;">%d</span>'%c_sum
  s_html += '</div>'
  
  a_code_name = ["HTML(模板)", "HTML(文章)", "CSS", "JS(通用)", "JS(文章)", "Python"]
  s_html += '<div class="Xbar-legend" style="margin:2px 0 0 2px;">'
  for i in range(6):
    s_html += '<div title="%s ( %.02f%% )">'%("{:,}".format(a_c[i]), a_c[i]/c_sum*100)
    s_html += '<div style="background-color:#%s;"></div>'%a_color[i]
    s_html += '<span%s>%s</span>'%((' style="margin-top:3px;"' if i == 2 or i == 5 else ''), a_code_name[i])
    s_html += '</div>'
  s_html += '</div>'
  
  return s_html

def page_update_index(page_path):
  with open(page_path, mode="r", encoding="utf-8") as f:
    s_page = f.read()
  a_s_page = s_page.split("<!--pyINSERT_codeLength-->")
  a_s_page[1] = make_bar()
  s_page = "<!--pyINSERT_codeLength-->".join(a_s_page)
  with open(page_path, mode="w", encoding="utf-8") as f:
    f.write(page_insert(s_template, s_page, ""))

group_data = read_json("groupData.json")

with open("template.html", mode="r", encoding="utf-8") as f:
  s_template = f.read()

page_update_index("../index.html")

page_update("../menu.html", "main_menu")
page_update("../update.html")
for page_name in get_folder_file_name("../page", "html"):
  page_update("../page/%s"%page_name, page_name.rstrip("html").rstrip("."))
