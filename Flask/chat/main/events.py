import json
from .. import socketio
from flask_socketio import SocketIO, send, emit, join_room, leave_room, disconnect
from flask import Flask, session, request, json as flask_json

@socketio.on('connect')
def on_connect():
	if request.args.get('fail'):
		return False
	print('Connection established successfully!')


@socketio.on('disconnect')
def on_disconnect():
	global disconnected
	print('Disconnected successfully')
	disconnected = '/'


@socketio.on("sendMessage")
def handleIncomingMessage(data):
	print( json.dumps(data, indent = 4))
	message = data['message']
	username = data['username']
	room = data['room']
	substring ="!"
	if substring in message:
		send({"responseMessage": "dies ist die Hilfeliste", "username": "bot"}, room=room)
	else:
		send({"responseMessage": message, "username": username}, room=room)


@socketio.on('join')
def on_join(data):
	print( json.dumps(data, indent = 4))
	print( request.sid + "sid")
	username = data['username']
	room = data['room']
	join_room(room)
	send({"responseMessage": 'Willkommen ' + username + '! Du kannst einfach eine Nachricht eingeben oder mich durch Befehle steuern! Um die Befehlsliste zu sehen kannst du !Befehle eingeben, falls du Hilfe brauchst schreib einfach !Hilfe.'}, room=room)

@socketio.on('leave')
def on_leave(data):
	print( json.dumps(data, indent = 4))
	username = data['username']
	room = data['room']
	leave_room(room)
	send({"responseMessage": username + ' has left the room - '+ room + '.'}, room=room)