"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  MoreHorizontal,
  X,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Command,
  Bot,
  Send,
  Menu,
  ArrowLeft,
} from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  company: string;
  subject: string;
  time: string;
  unread?: boolean;
  priority?: "high" | "normal";
  avatar: string;
}

interface Message {
  id: string;
  sender: "customer" | "agent" | "ai";
  content: string;
  timestamp: string;
  avatar?: string;
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Luis",
    company: "GitHub",
    subject: "Hey! I have a question...",
    time: "43m",
    avatar: "L",
  },
  {
    id: "2",
    name: "Ivan",
    company: "Nike",
    subject: "Hi there, I have a qu...",
    time: "2h",
    unread: true,
    priority: "high",
    avatar: "I",
  },
  {
    id: "3",
    name: "Lead from New York",
    company: "",
    subject: "Good morning, let me...",
    time: "43m",
    unread: true,
    avatar: "L",
  },
  {
    id: "4",
    name: "Booking API problems",
    company: "",
    subject: "Bug report",
    time: "43m",
    avatar: "B",
  },
  {
    id: "5",
    name: "Miracle - Exemplary Bank",
    company: "",
    subject: "Hey there, I'm here for...",
    time: "43m",
    avatar: "M",
  },
];

const messages: Message[] = [
  {
    id: "1",
    sender: "customer",
    content:
      "I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-opened.",
    timestamp: "2 hours",
    avatar: "L",
  },
  {
    id: "2",
    sender: "ai",
    content: "Let me just look into this for you, Luis.",
    timestamp: "Seen • 1min",
    avatar: "AI",
  },
];

export default function CustomerSupportDashboard() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [messageInput, setMessageInput] = useState("");
  const [currentView, setCurrentView] = useState<
    "inbox" | "conversation" | "details"
  >("conversation");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-2rem)] max-w-[1400px] mx-auto bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            {currentView !== "inbox" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setCurrentView(
                    currentView === "details" ? "conversation" : "inbox"
                  )
                }
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <h1 className="text-lg font-semibold">
              {currentView === "inbox"
                ? "Your inbox"
                : currentView === "conversation"
                ? "Luis Easton"
                : "Details"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {currentView === "conversation" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView("details")}
              >
                <Menu className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr_320px] flex-1 lg:h-full">
          {/* Left Panel - Inbox */}
          <div
            className={`border-r border-gray-200 bg-gray-50/50 flex flex-col ${
              currentView === "inbox" ? "block" : "hidden lg:flex"
            }`}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Your inbox
                </h2>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="ghost" size="sm" className="text-xs">
                  5 Open <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Waiting longest <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors ${
                    selectedConversation.id === conversation.id
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedConversation(conversation);
                    setCurrentView("conversation");
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback
                          className={`text-xs font-medium ${
                            conversation.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {conversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.unread && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.name}
                          {conversation.company && (
                            <span className="text-gray-500">
                              {" "}
                              • {conversation.company}
                            </span>
                          )}
                        </p>
                        <span className="text-xs text-gray-500">
                          {conversation.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 truncate mt-1">
                        {conversation.subject}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Panel - Conversation */}
          <div
            className={`flex flex-col h-full border-r border-gray-200 ${
              currentView === "conversation" ? "block" : "hidden lg:flex"
            }`}
          >
            {/* Header */}
            <div className="hidden lg:flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  Luis Easton
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-900 text-white hover:bg-gray-800"
                >
                  <X className="w-4 h-4 mr-1" />
                  Close
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-3 lg:gap-4">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback
                      className={`text-xs font-medium ${
                        message.sender === "ai"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {message.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 max-w-full lg:max-w-2xl">
                    <div
                      className={`inline-block p-3 lg:p-4 rounded-2xl ${
                        message.sender === "customer"
                          ? "bg-gray-100 text-gray-900"
                          : "bg-blue-100 text-blue-900"
                      }`}
                    >
                      <p className="text-sm leading-relaxed break-words">
                        {message.content}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      {message.timestamp}
                      {message.sender === "ai" && (
                        <Avatar className="w-4 h-4">
                          <AvatarImage src="/placeholder.svg?height=16&width=16" />
                          <AvatarFallback className="text-xs">
                            👤
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Input Area */}
            <div className="border-t border-gray-200 bg-gray-50/50 p-3 lg:p-4">
              <div className="space-y-3">
                {/* Suggested Responses */}
                <div className="flex items-center gap-2 text-sm overflow-x-auto">
                  <span className="text-gray-600 flex-shrink-0">Suggested</span>
                  <div className="flex gap-2 min-w-0">
                    <Badge
                      variant="outline"
                      className="text-xs whitespace-nowrap flex-shrink-0"
                    >
                      🔄 How do I get a refund?
                    </Badge>
                  </div>
                </div>

                {/* Input Area */}
                <div className="flex items-center gap-2 lg:gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden lg:flex items-center gap-1 text-xs flex-shrink-0"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat <ChevronDown className="w-3 h-3" />
                  </Button>
                  <div className="flex-1 relative min-w-0">
                    <Input
                      placeholder="Ask a question..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="pr-10 bg-white border-gray-300 rounded-lg w-full"
                    />
                    <Button
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0 flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-gray-500 flex items-center gap-1">
                  Use <Command className="w-3 h-3" />K for shortcuts
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Details & AI Copilot */}
          <div
            className={`bg-gray-50/30 flex flex-col ${
              currentView === "details" ? "block" : "hidden lg:flex"
            }`}
          >
            {/* Right Panel Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex border rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-blue-100 text-blue-700 rounded-none border-r px-3"
                  >
                    <Bot className="w-4 h-4 mr-1" />
                    AI Copilot
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-none px-3"
                  >
                    Details
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* AI Copilot Content */}
            <div className="flex-1 p-4 space-y-4">
              {/* AI Copilot Card */}
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">
                        Hi, I'm Fin AI Copilot
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Ask me anything about this conversation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Details */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-3">Customer Details</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span>Luis Easton</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company:</span>
                      <span>GitHub</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge variant="outline" className="text-xs">
                        Active
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-3">Recent Activity</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Message sent</span>
                      <span className="text-gray-500 ml-auto">2h ago</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">
                        Conversation started
                      </span>
                      <span className="text-gray-500 ml-auto">3h ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
