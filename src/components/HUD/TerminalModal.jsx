import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft, Sparkles, Orbit } from 'lucide-react';
import { terminalCommands, personalInfo, celestialBodies } from '../../data/solarData';
import { playClick, playTerminalKeystroke, playWarp } from '../../utils/audio';

export default function TerminalModal({
  isOpen,
  onClose,
  onWarpToBody,
  onOpenResume
}) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'INITIATING AYUSH-OS CELESTIAL CLI v2026.4...' },
    { type: 'system', text: 'Type "help" to list available telemetry commands or "warp <body >" to navigate orbits.' }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmed = inputVal.trim();
      if (!trimmed) return;

      playTerminalKeystroke();
      const newHistory = [...history, { type: 'user', text: `ayush@nexus:~$ ${trimmed}` }];
      setCommandHistory(prev => [...prev, trimmed]);
      setHistoryIndex(-1);

      const parts = trimmed.toLowerCase().split(' ');
      const cmd = parts[0];
      const arg = parts[1];

      if (cmd === 'clear') {
        setHistory([]);
        setInputVal('');
        return;
      } else if (cmd === 'help') {
        newHistory.push({ type: 'output', text: terminalCommands.help });
      } else if (cmd === 'about') {
        newHistory.push({ type: 'output', text: terminalCommands.about });
      } else if (cmd === 'skills') {
        newHistory.push({ type: 'output', text: terminalCommands.skills });
      } else if (cmd === 'projects') {
        newHistory.push({ type: 'output', text: terminalCommands.projects });
      } else if (cmd === 'workradar') {
        newHistory.push({ type: 'output', text: terminalCommands.workradar });
      } else if (cmd === 'vaccitrack') {
        newHistory.push({ type: 'output', text: terminalCommands.vaccitrack });
      } else if (cmd === 'awards') {
        newHistory.push({ type: 'output', text: terminalCommands.awards });
      } else if (cmd === 'experience') {
        newHistory.push({ type: 'output', text: terminalCommands.experience });
      } else if (cmd === 'contact') {
        newHistory.push({ type: 'output', text: terminalCommands.contact });
      } else if (cmd === 'resume') {
        newHistory.push({ type: 'output', text: 'Opening official resume dossier...' });
        onOpenResume();
      } else if (cmd === 'warp') {
        if (!arg) {
          newHistory.push({ type: 'error', text: 'Usage: warp <sun|mercury|venus|earth|mars|jupiter|saturn|uranus|neptune>' });
        } else {
          const match = celestialBodies.find(b => b.id.toLowerCase().includes(arg) || b.name.toLowerCase().includes(arg));
          if (match) {
            newHistory.push({ type: 'success', text: `ENGAGING HYPERDRIVE: Vector locked on ${match.name}...` });
            playWarp();
            onWarpToBody(match.id);
            onClose();
          } else {
            newHistory.push({ type: 'error', text: `Target "${arg}" not found in solar ephemeris.` });
          }
        }
      } else if (trimmed === 'sudo hire-me') {
        newHistory.push({ 
          type: 'success', 
          text: `[PROTOCOL ACTIVATED]: Candidate AYUSH SHUKLA approved for interview warp!\nDispatching transmission to ayush.apply41@gmail.com\n"Looking forward to building exceptional systems together!"` 
        });
      } else {
        newHistory.push({ type: 'error', text: `bash: ${trimmed}: command not found. Type "help" for command matrix.` });
      }

      setHistory(newHistory);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple autocomplete
      const list = ['help', 'about', 'skills', 'projects', 'workradar', 'vaccitrack', 'awards', 'experience', 'contact', 'resume', 'clear', 'warp earth', 'warp mars', 'sudo hire-me'];
      const match = list.find(c => c.startsWith(inputVal.trim()));
      if (match) setInputVal(match);
    } else {
      playTerminalKeystroke();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-3xl h-[520px] max-h-[85vh] rounded-2xl bg-space-950/95 border border-cyan-500/40 shadow-[0_0_50px_rgba(0,242,254,0.3)] flex flex-col overflow-hidden font-mono text-xs sm:text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {/* TERMINAL HEADER */}
        <div className="px-4 py-3 bg-space-900 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-cyan-300 font-bold text-xs flex items-center space-x-1.5">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>ayush@solar-nexus: ~ (bash)</span>
            </span>
          </div>

          <button
            onClick={() => { playClick(); onClose(); }}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-space-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* TERMINAL BODY */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2.5 text-slate-200">
          {history.map((item, idx) => (
            <div key={idx} className="leading-relaxed">
              {item.type === 'user' && (
                <div className="text-cyan-400 font-bold">{item.text}</div>
              )}
              {item.type === 'system' && (
                <div className="text-slate-400">{item.text}</div>
              )}
              {item.type === 'output' && (
                <div className="text-slate-300 whitespace-pre-wrap pl-2 border-l-2 border-cyan-500/40">
                  {item.text}
                </div>
              )}
              {item.type === 'success' && (
                <div className="text-emerald-400 whitespace-pre-wrap font-bold pl-2 border-l-2 border-emerald-500">
                  {item.text}
                </div>
              )}
              {item.type === 'error' && (
                <div className="text-red-400 pl-2 border-l-2 border-red-500">
                  {item.text}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* TERMINAL INPUT LINE */}
        <div className="p-3 bg-space-900/60 border-t border-slate-800 flex items-center space-x-2">
          <span className="text-cyan-400 font-bold text-xs sm:text-sm">ayush@nexus:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs sm:text-sm caret-cyan-400"
            placeholder="Type 'help', 'warp earth', 'projects'..."
            spellCheck="false"
            autoFocus
          />
          <CornerDownLeft className="w-4 h-4 text-slate-500" />
        </div>

      </div>
    </div>
  );
}
