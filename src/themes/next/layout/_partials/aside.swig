{% if page.aside != ""%}
			<div class="article-aside">
              <aside class="aside-aside">
                <h2 style="padding-left: 25px;">
				相关文章
                </h2>
                <ul>   
				{%for post in site.posts%}	
				{%if page.aside==post.aside%}					
                  <li>
				  {%if post.title==page.title%}
                    <a href="/{{post.path}}" style="font-weight: bold;">
                     {{post.title}}
                    </a>	
					{% else %}
					 <a href="/{{post.path}}">
                     {{post.title}}
                    </a>	
				 {% endif %}					
                  </li>
				{% endif %}
				{% endfor %}
                </ul>
              </aside>
            </div>
{% endif %}