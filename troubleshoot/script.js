document.addEventListener("DOMContentLoaded", () => {
  // --- Element Selectors ---
  const tosOverlay = document.getElementById("tos-overlay");
  const tosAgreeCheckbox = document.getElementById("tos-agree");
  const piracyAffirmCheckbox = document.getElementById("piracy-affirm");
  const agreeButton = document.getElementById("agree-button");
  const chatLog = document.getElementById("chat-log");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const suggestedQueryButtons = document.querySelectorAll(".query-btn");

  // --- Terms of Service Logic ---
  const checkCheckboxes = () => {
    agreeButton.disabled = !(
      tosAgreeCheckbox.checked && piracyAffirmCheckbox.checked
    );
  };

  tosAgreeCheckbox.addEventListener("change", checkCheckboxes);
  piracyAffirmCheckbox.addEventListener("change", checkCheckboxes);

  if (
    document.cookie.includes("tosAccepted=true") &&
    document.cookie.includes("noPiracyAffirmed=true")
  ) {
    tosOverlay.style.display = "none";
  }

  agreeButton.addEventListener("click", () => {
    if (!agreeButton.disabled) {
      tosOverlay.style.display = "none";
      // Set cookies to expire in one year
      const yearInMs = 365 * 24 * 60 * 60 * 1000;
      document.cookie = `tosAccepted=true; max-age=${yearInMs}; path=/`;
      document.cookie = `noPiracyAffirmed=true; max-age=${yearInMs}; path=/`;
    }
  });

  // --- Chatbot FAQ Database (Expanded) ---
  const faq = {
    general: `Here are some essential first steps and common fixes that solve many problems.
        <br><br><strong>🚨 IMPORTANT:</strong> Do NOT run 'BOTWM_Autoupdater.exe' as it will delete the mod files. Watch the official guide carefully: <a href='https://youtu.be/HBncXsZjL7M?si=tGiIrsX1FyJmfcsJ' target='_blank'>Installation Video</a>.
        <br><br><strong>1. Remerge Mods in BCML:</strong> This is a very common fix. In BCML, click the remerge button (the circular arrow, fourth from the left in the bottom left corner).
        <br><br><strong>2. Check for Incompatible Mods:</strong> Any mods that affect Link's model or animations (like Linkle or Zelda's Ballad) are not compatible. Please disable all other mods to ensure they are not the cause of the issue.
        <br><br><strong>3. Check Cemu Version:</strong> The mod is only compatible with Cemu <strong>v2.0-48 or earlier</strong>. The recommended version is 1.26.2.
        <br><br><strong>4. Keep Server Window Open:</strong> The 'BOTW.DedicatedServer.exe' window must remain open while you are playing.
        <br><br><strong>5. Check BNP Priority:</strong> In BCML, 'BOTW Multiplayer - Classic' must be listed above 'Breath of the Wild Multiplayer'.`,

    crashing: `Game crashes or being "forcibly closed" are often caused by configuration issues. Let's walk through the fixes.
        <br><br><strong>1. Check Cemu Version & Graphics Packs:</strong>
        <br>&nbsp;&nbsp;&nbsp;• Ensure Cemu is <strong>v2.0-48 or earlier</strong> (1.26.2 is recommended).
        <br>&nbsp;&nbsp;&nbsp;• In Cemu Graphics Packs, make sure the community pack is downloaded.
        <br>&nbsp;&nbsp;&nbsp;• Under 'Mods', enable: <strong>'Extended Memory'</strong> & <strong>'BCML'</strong>.
        <br>&nbsp;&nbsp;&nbsp;• Under 'Multiplayer', enable: <strong>'Utilities'</strong>.
        <br><br><strong>2. Check Other Mods & Saves:</strong>
        <br>&nbsp;&nbsp;&nbsp;• Mods for Link's model (Linkle) or language translations can cause crashes. Disable them.
        <br>&nbsp;&nbsp;&nbsp;• If you installed other mods recently, they may have created dependencies in your save file. Back up your save, uninstall the other mods, and see if the multiplayer mod works on a new save file.
        <br><br><strong>3. BCML & Game Config:</strong>
        <br>&nbsp;&nbsp;&nbsp;• Check that 'BOTW Multiplayer - Classic' has a higher priority in BCML.
        <br>&nbsp;&nbsp;&nbsp;• Try uninstalling and reinstalling the BNPs (smallest one first), then remerge.
        <br>&nbsp;&nbsp;&nbsp;• Ensure the game language is the same in both Cemu and BCML settings.
        <br><br><strong>4. Final Checks:</strong>
        <br>&nbsp;&nbsp;&nbsp;• Your username in the launcher cannot have special characters.
        <br>&nbsp;&nbsp;&nbsp;• Verify you have game <strong>Update 208</strong> and <strong>DLC 80</strong>.
        <br>&nbsp;&nbsp;&nbsp;• Try deleting the 'shaderCache' folder in your Cemu directory.`,

    friend: `If you can't see your friend in-game, let's troubleshoot the connection.
        <br><br><strong>1. Confirm Mod is Active:</strong> First, both you and your friend need to check if you have a main quest named "botw multiplayer" and see a "joined server" notification when you load your save. If not, Cemu isn't recognizing the mod.
        <br><br><strong>2. Reinstall & Remerge:</strong> If the quest is missing, try reinstalling the BNPs in BCML. Uninstall both, then reinstall the smaller 'BreathoftheWildMultiplayer.bnp' first, followed by the Classic one, and then remerge.
        <br><br><strong>3. Enable Graphics Packs:</strong> Double-check that 'Extended Memory' (under Mods) and 'Utilities' (under Multiplayer) are both enabled in Cemu's Graphics Packs.
        <br><br><strong>4. Check BCML Paths:</strong> Verify your Cemu and game directory paths in BCML settings are correct.
        <br><br><strong>5. Verify Game Version:</strong> Ensure both you and your friend have game <strong>Update 208</strong> and <strong>DLC 80</strong>.`,

    hamachi: `Hamachi issues that say 'server closed' are almost always a firewall problem.
        <br><br><strong>1. Ping Test:</strong> Right-click your friend's name in Hamachi and select 'Ping'. If it fails, a firewall or antivirus is blocking the connection.
        <br><br><strong>2. Configure Windows Firewall (Detailed Steps):</strong>
        <br>&nbsp;&nbsp;&nbsp;1. Open 'Windows Defender Firewall with Advanced Security'.
        <br>&nbsp;&nbsp;&nbsp;2. Click on 'Windows Defender Firewall Properties'.
        <br>&nbsp;&nbsp;&nbsp;3. Go to the 'Domain Profile', 'Private Profile', and 'Public Profile' tabs one by one.
        <br>&nbsp;&nbsp;&nbsp;4. In each tab, click 'Customize' next to 'Protected network connections'.
        <br>&nbsp;&nbsp;&nbsp;5. Uncheck the box for 'Hamachi'.
        <br>&nbsp;&nbsp;&nbsp;6. Click OK and restart Hamachi after you've done this for all three profiles.
        <br><br><strong>3. Configure Server & Client IP:</strong>
        <br>&nbsp;&nbsp;&nbsp;• <strong>Host:</strong> The host must open 'ServerConfig.ini' and replace 'localhost' with their Hamachi IPv4 address.
        <br>&nbsp;&nbsp;&nbsp;• <strong>Client:</strong> The joining player must enter the host's Hamachi IPv4 and port (usually 5050) in the launcher.`,

    pipeBusy: `The "All pipe instances are busy" error is a simple fix. Just restart the mod's executable files ('BOTW.DedicatedServer.exe' and 'Breath of the Wild Multiplayer.exe').`,

    pipeConnect: `The "Pipe has not been connected yet" error means you're missing required system components.
        <br><br><strong>1. Install Runtimes:</strong> Make sure you have the latest versions of ALL THREE of these installed:
        <br>&nbsp;&nbsp;&nbsp;• <a href='https://learn.microsoft.com/en-US/cpp/windows/latest-supported-vc-redist?view=msvc-170#visual-studio-2015-2017-2019-and-2022' target='_blank'>C++ Redistributable (x86 & x64 versions)</a>
        <br>&nbsp;&nbsp;&nbsp;• <a href='https://dotnet.microsoft.com/en-us/download/dotnet/6.0' target='_blank'>.NET 6 Desktop Runtime</a>
        <br><br><strong>2. Restart Your PC:</strong> You MUST restart your computer after installing them for the changes to take effect.
        <br><br><strong>3. Move Mod Folder:</strong> If it still fails, try moving the entire mod folder to the root of your C: drive (e.g., C:\\BOTWMultiplayer).`,

    utilities: `If the 'Multiplayer Utilities' graphics pack isn't appearing in Cemu, it's usually a BCML merge issue.
        <br><br>1. In BCML, uninstall both 'BOTW Multiplayer - Classic' and 'Breath of the Wild Multiplayer'.
        <br><br>2. Reinstall them, making sure to install the smaller BNP ('BreathoftheWildMultiplayer.bnp') first.
        <br><br>3. Click the remerge button in BCML (the circular arrow icon).`,

    processError: `If you see an error that says "An error occurred trying to start process," the mod launcher needs higher permissions.
        <br><br>Right-click 'Breath of the Wild Multiplayer.exe' and choose 'Run as administrator'.`,

    autoupdater: `You should <strong>NEVER</strong> run 'BOTWM_Autoupdater.exe'. It is outdated and will delete essential mod files, breaking your installation. If you have already run it, you will need to reinstall the mod from scratch.`,

    pipeError: `There are two common "pipe" errors. Here are the solutions for both:
        <br><br><strong>If your error is "All pipe instances are busy":</strong>
        <br>This is a simple fix. Just restart the mod's executable files ('BOTW.DedicatedServer.exe' and 'Breath of the Wild Multiplayer.exe').
        <br><br><strong>If your error is "Pipe has not been connected yet":</strong>
        <br>This means you're missing required system components.
        <br><br><strong>1. Install Runtimes:</strong> Make sure you have the latest versions of ALL THREE of these installed:
        <br>&nbsp;&nbsp;&nbsp;• <a href='https://learn.microsoft.com/en-US/cpp/windows/latest-supported-vc-redist?view=msvc-170#visual-studio-2015-2017-2019-and-2022' target='_blank'>C++ Redistributable (x86 & x64 versions)</a>
        <br>&nbsp;&nbsp;&nbsp;• <a href='https://dotnet.microsoft.com/en-us/download/dotnet/6.0' target='_blank'>.NET 6 Desktop Runtime</a>
        <br><br><strong>2. Restart Your PC:</strong> You MUST restart your computer after installing them for the changes to take effect.
        <br><br><strong>3. Move Mod Folder:</strong> If it still fails, try moving the entire mod folder to the root of your C: drive (e.g., C:\\BOTWMultiplayer).`,

    default:
      "I'm sorry, I don't have a specific answer for that. Please try rephrasing your question or choose one of the suggested topics. I can help with <strong>'general fixes'</strong>, <strong>'crashing'</strong>, <strong>'seeing friends'</strong>, <strong>'Hamachi issues'</strong>, and <strong>'pipe errors'</strong>. If these don't solve your specific problem, join the official Discord server for more help: <a href='https://discord.com/invite/sqeKHhBJse' target='_blank'>Milk Bar Studios Discord</a>.",
  };

  // --- Core Chatbot Functions ---
  const appendMessage = (sender, messageHtml) => {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("chat-message", sender);

    const pfp = document.createElement("img");
    pfp.className = "pfp";
    pfp.alt = `${sender} PFP`;
    pfp.src = sender === "user" ? "user.svg" : "chatbot.jpg";

    const content = document.createElement("div");
    content.className = "message-content";
    content.innerHTML = messageHtml;

    if (sender === "user") {
      messageWrapper.appendChild(content);
      messageWrapper.appendChild(pfp);
    } else {
      messageWrapper.appendChild(pfp);
      messageWrapper.appendChild(content);
    }

    chatLog.appendChild(messageWrapper);
    chatLog.scrollTop = chatLog.scrollHeight;
  };

  const showTypingIndicator = () => {
    const typingMessage = `
            <div class="chat-message bot" id="typing-indicator">
                <img src="chatbot.jpg" alt="Bot PFP" class="pfp">
                <div class="message-content">
                    <div class="typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>`;
    chatLog.insertAdjacentHTML("beforeend", typingMessage);
    chatLog.scrollTop = chatLog.scrollHeight;
  };

  const removeTypingIndicator = () => {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) indicator.remove();
  };

  const getBotResponse = (query) => {
    const q = query.toLowerCase();

    // More robust keyword matching with added edge cases
    if (q.includes("autoupdater") || q.includes("auto updater")) {
      return faq.autoupdater;
    }
    if (
      q.includes("crash") ||
      q.includes("closes") ||
      q.includes("10054") ||
      q.includes("forcibly") ||
      q.includes("socket") ||
      q.includes("remote host") ||
      q.includes("freezes") ||
      q.includes("extended memory")
    ) {
      return faq.crashing;
    }
    if (
      q.includes("friend") ||
      q.includes("can't see") ||
      q.includes("cannot see") ||
      q.includes("invisible") ||
      q.includes("player not appearing") ||
      (q.includes("connect") &&
        !q.includes("hamachi") &&
        !q.includes("pipe")) ||
      q.includes("quest") ||
      q.includes("notification")
    ) {
      return faq.friend;
    }
    if (
      q.includes("hamachi") ||
      q.includes("server closed") ||
      q.includes("firewall") ||
      q.includes("ping") ||
      q.includes("ipv4")
    ) {
      return faq.hamachi;
    }
    if (q.includes("pipe") && q.includes("busy")) {
      return faq.pipeBusy;
    }
    if (
      q.includes("pipe") &&
      (q.includes("connect") ||
        q.includes("yet") ||
        q.includes("runtime") ||
        q.includes(".net") ||
        q.includes("c++"))
    ) {
      return faq.pipeConnect;
    }
    if (q.includes("pipe")) {
      return faq.pipeError;
    }
    if (
      q.includes("utilities") ||
      (q.includes("pack") &&
        (q.includes("missing") || q.includes("not appearing")))
    ) {
      return faq.utilities;
    }
    if (
      q.includes("process") ||
      q.includes("administrator") ||
      q.includes("permission") ||
      q.includes("run as admin")
    ) {
      return faq.processError;
    }
    if (
      q.includes("start") ||
      q.includes("where to") ||
      q.includes("common") ||
      q.includes("general") ||
      q.includes("how to") ||
      q.includes("guide") ||
      q.includes("help")
    ) {
      return faq.general;
    }
    return faq.default;
  };

  const handleUserQuery = (query) => {
    if (!query.trim()) return;

    appendMessage("user", `<p>${query}</p>`);
    userInput.value = "";

    setTimeout(() => {
      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        const response = getBotResponse(query);
        appendMessage("bot", response);
      }, 1200 + Math.random() * 500); // Simulate "thinking" time
    }, 300);
  };

  // --- Event Listeners ---
  sendBtn.addEventListener("click", () => handleUserQuery(userInput.value));
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleUserQuery(userInput.value);
    }
  });

  suggestedQueryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleUserQuery(button.textContent);
    });
  });
});
