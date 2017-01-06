from javax.servlet.http import HttpServlet
from com.smartfoxserver.v2 import SmartFoxServer

from random import randint
from MyModule import alpha, square

class index(HttpServlet):

	def __init__(self):
		self.htmlHead = "<html><head></head><body style='font-family:Verdana'>"
		self.closeHtml = "</body></html>"

		
	def doGet(self, request, response):	
		w = response.getWriter()
		w.println(self.htmlHead)
		
		w.println("<h2>SmartFoxServer 2X :: Status</h2><hr>")
		w.println("<p>ver: " + SmartFoxServer.version + "<p>")
		w.println("<p>rnd: " + str(randint(0,1000)) + "<p>")
		w.println("<table cellpadding='6' cellspacing='0' border='0'>")
		w.println("<tr bgcolor='#eeeeee'><th align='left'>Key</th><th align='left'>Value</th></tr>")
		
		sfs = SmartFoxServer.getInstance()
		zManager = sfs.getZoneManager()
		zones = zManager.getZoneList()
		
		for zone in zones:
			w.println('<ul><li><b>' + zone.name + '</b>')
			
			rooms = zone.getRoomList()
			for room in rooms:
				w.println(('<ul><li>%s (%s/%s)</li></ul>' % (room.name, room.maxUsers, room.maxSpectators)))				
			
			w.println('</li></ul>')
		
		w.println(self.closeHtml)
		w.close()
		
	def doPost(self, request, response):	
		pass
		