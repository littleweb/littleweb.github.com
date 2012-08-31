---
layout: page
title: 小web的博客
tagline: Supporting tagline
---
{% include JB/setup %}



## 日志

<ul class="posts">
  {% for post in site.posts %}
    <li>
    	<p><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></p>
    	<p>{{ post.description }}</p>
    </li>
  {% endfor %}
</ul>
