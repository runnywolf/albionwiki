import os

def get_substr(str, substr1, substr2):
  return str.split(substr1)[1].split(substr2)[0]

def page_insert(temp, page):
  temp = str(temp)
  temp = temp.replace("$pyINSERT_iconURL$", "../image/icon.webp")
  temp = temp.replace("$pyINSERT_cssURL$", "../tool/albionwiki.css")
  temp = temp.replace("$pyINSERT_jsURL_main$", "../tool/albionwiki.js")
  if "%s.js"%page in os.listdir("pageJS"):
    temp = temp.replace("$pyINSERT_pageJS$", '\n    <script src="../tool/pageJS/%s.js"></script>'%page)
  else:
    temp = temp.replace("$pyINSERT_pageJS$", "")
  temp = temp.replace("$pyINSERT_bgURL$", "../image/bg.webp")
  temp = temp.replace("$pyINSERT_headIconURL$", "../image/icon.webp")

  s_contents = ""
  for groupData in a_contentsData:
    s_contents += '<div class="main-contents-group">%s(%d)</div>'%(groupData["group"], len(groupData["a_page"]))
    s_contents += '<div class="main-contents-link">'
    for pageData in groupData["a_page"]:
      if page == pageData["page"]:
        s_contents += '<div><a class="red" href="https://runnywolf.github.io/albionwiki/page/%s">%s</a></div>'%(page, pageData["title"])
      else:
        s_contents += '<div><a href="https://runnywolf.github.io/albionwiki/page/%s">%s</a></div>'%(pageData["page"], pageData["title"])
    s_contents += '</div>'
  temp = temp.replace('$pyINSERT_contents$', s_contents)

  if page == "menu":
    s_page = '<div class="main-article-title-h1" style="text-align:center;">頁面清單</div>'
    for groupData in a_contentsData:
      s_page += '<div class="main-article-paragraph">'
      s_page += '<div class="menu-title">%s(%d)</div>'%(groupData["group"], len(groupData["a_page"]))
      s_page += '<div class="menu-list">'
      for pageData in groupData["a_page"]:
        s_page += '<div><a href="https://runnywolf.github.io/albionwiki/page/%s">%s</a>&nbsp;<span class="red">&gt;</span>&nbsp;%s</div>'%(pageData["page"], pageData["title"], pageData["info"])
      s_page += '</div>'
      s_page += '</div>'
  else:
    file = open("../page/%s.html"%page, mode="r", encoding="utf-8")
    s_page = file.read()
    file.close()
    s_page = get_substr(s_page, '<div class="main-article">', '<div class="main-error" id="main-error">')
    s_page = "</div>".join(s for s in s_page.split("</div>")[:-1])
  temp = temp.replace("$pyINSERT_article$", s_page)

  temp = temp.replace("$pyINSERT_discordIcon$", "../image/discord_icon.webp")
  temp = temp.replace("$pyINSERT_version$", version)

  file = open("../page/%s.html"%page, mode="w", encoding="utf-8")
  file.write(temp)
  file.close()

def page_insert_main(temp):
  temp = str(temp)
  temp = temp.replace("$pyINSERT_iconURL$", "image/icon.webp")
  temp = temp.replace("$pyINSERT_cssURL$", "tool/albionwiki.css")
  temp = temp.replace("$pyINSERT_jsURL_main$", "tool/albionwiki.js")
  temp = temp.replace("$pyINSERT_pageJS$", "")
  temp = temp.replace("$pyINSERT_bgURL$", "image/bg.webp")
  temp = temp.replace("$pyINSERT_headIconURL$", "image/icon.webp")

  s_contents = ""
  for groupData in a_contentsData:
    s_contents += '<div class="main-contents-group">%s(%d)</div>'%(groupData["group"], len(groupData["a_page"]))
    s_contents += '<div class="main-contents-link">'
    for pageData in groupData["a_page"]:
      s_contents += '<div><a href="https://runnywolf.github.io/albionwiki/page/%s">%s</a></div>'%(pageData["page"], pageData["title"])
    s_contents += '</div>'
  temp = temp.replace('$pyINSERT_contents$', s_contents)

  file = open("../index.html", mode="r", encoding="utf-8")
  s_page = file.read()
  file.close()
  s_page = get_substr(s_page, '<div class="main-article">', '<div class="main-error" id="main-error">')
  s_page = "</div>".join(s for s in s_page.split("</div>")[:-1])
  temp = temp.replace("$pyINSERT_article$", s_page)

  temp = temp.replace("$pyINSERT_discordIcon$", "image/discord_icon.webp")
  temp = temp.replace("$pyINSERT_version$", version)

  file = open("../index.html", mode="w", encoding="utf-8")
  file.write(temp)
  file.close()

def get_file_len(url):
  file = open(url, mode="r", encoding="utf-8")
  s_page = file.read()
  file.close()
  s_page = s_page.replace(" ", "").replace("\t", "").replace("\n", "")
  return len(s_page)
def get_article_len(url):
  file = open(url, mode="r", encoding="utf-8")
  s_page = file.read()
  file.close()
  s_page = get_substr(s_page, '<div class="main-article">', '<div class="main-error" id="main-error">')
  s_page = "</div>".join(s for s in s_page.split("</div>")[:-1])
  s_page = s_page.replace(" ", "").replace("\t", "").replace("\n", "")
  return len(s_page)
def page_insert_codelen():
  bar_width = 500

  c_html_temp = get_file_len("template.html")
  c_html_page = get_article_len("../index.html")
  for i in os.listdir("../page"):
    c_html_page += get_article_len("../page/%s"%i)
  c_css = get_file_len("albionwiki.css")
  c_js_main = get_file_len("albionwiki.js")
  c_js_page = 0
  for i in os.listdir("pageJS"):
    c_js_page += get_file_len("pageJS/%s"%i)
  c_py = get_file_len("insert.py")
  c_sum = c_html_temp+c_html_page+c_css+c_js_main+c_js_page+c_py
  
  file = open("../index.html", mode="r", encoding="utf-8")
  s_page = file.read()
  file.close()
  as_page = s_page.split("<!--pyINSERT_codeLength-->")

  as_page[1] = "".join([
    '<table class="x-bar"><tr>',
    '<td style="width:%.1fpx; background-color:#%s;"></td>'%(c_html_temp/c_sum*bar_width, "c00"),
    '<td style="width:%.1fpx; background-color:#%s;">%d</td>'%(c_html_page/c_sum*bar_width, "f00", c_html_page),
    '<td style="width:%.1fpx; background-color:#%s;">%d</td>'%(c_css/c_sum*bar_width, "d0d", c_css),
    '<td style="width:%.1fpx; background-color:#%s;"></td>'%(c_js_main/c_sum*bar_width, "090"),
    '<td style="width:%.1fpx; background-color:#%s;">%d</td>'%(c_js_page/c_sum*bar_width, "0c0", c_js_page),
    '<td style="width:%.1fpx; background-color:#%s;">%d</td>'%(c_py/c_sum*bar_width, "66f", c_py),
    '</tr></table>',
    '<span style="margin:4px 0 0 4px;">%d</span>'%c_sum
  ])

  s_page = "<!--pyINSERT_codeLength-->".join(as_page)
  file = open("../index.html", mode="w", encoding="utf-8")
  file.write(s_page)
  file.close()

version = "v1.3 -&gt; Last update date: 2023/3/4"
a_contentsData = [
  {
    "group": "新手指南",
    "a_page": []
  },
  {
    "group": "進階攻略",
    "a_page": [
      {"page":"item_power", "title":"物品強度(ip)", "info":"物品強度、技能掌握加成、掌握補正、極限充能、裝備ip計算。"},
      {"page":"island", "title":"島嶼", "info":"島嶼購買、島嶼轉移。"},
      {"page":"farmer", "title":"農作物種植", "info":"使用農地、播種、澆水所需專注點、種子產量、種植收益計算。"},
      {"page":"infoboard", "title":"儀錶板與減傷機制", "info":"儀錶板的數值意義、防禦減傷計算、抗性減傷計算。"},
      {"page":"pve_point", "title":"戰鬥聲望點", "info":"獲取、使用、自動重新專精。"},
      {"page":"hideout", "title":"藏身地堡", "info":"種類和狀態、建造、設施、營養值消耗、能量等級、拆地堡。"},
      {"page":"item_durability", "title":"物品耐久度與修理費", "info":"耐久度消耗、實際影響、修理費計算。"}
    ]
  },
  {
    "group": "研究中",
    "a_page": [
      {"page":"pve_fame", "title":"PvE聲望與怪物強度", "info":"影響PvE聲望的條件、PvE聲望計算、怪物強度。"}
    ]
  },
  {
    "group": "資料",
    "a_page": [
      {"page":"faction_chest", "title":"100抽陣營黑鐵寶箱", "info":"開箱結果、陣營點數的最佳兌換選項。"},
      {"page":"conqueror_chest", "title":"100抽T7征服者寶箱", "info":"開箱結果、恩惠點數的最佳兌換選項。"},
      {"page":"hideout_food", "title":"運送食物到地堡", "info":"最適合運地堡的食物。"}
    ]
  },
]

file = open("template.html", mode="r", encoding="utf-8")
s_temp = file.read()
file.close()

page_insert_main(s_temp)
for i in os.listdir("../page"):
  page_insert(s_temp, i.split(".")[0])

page_insert_codelen()
