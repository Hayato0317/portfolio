<?php
// 宛先メールアドレス（実際のアドレスに変更してください）
define('TO_EMAIL', 'your-email@example.com');
define('SITE_NAME', 'Hayato Portfolio');

// POST メソッド以外は拒否
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

// 入力値の取得とサニタイズ
$name    = trim(strip_tags($_POST['name']    ?? ''));
$email   = trim(strip_tags($_POST['email']   ?? ''));
$subject = trim(strip_tags($_POST['subject'] ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));

// バリデーション
$errors = [];
if ($name === '') {
    $errors[] = 'お名前を入力してください。';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = '有効なメールアドレスを入力してください。';
}
if ($subject === '') {
    $errors[] = '件名を入力してください。';
}
if ($message === '') {
    $errors[] = 'メッセージを入力してください。';
}

if (!empty($errors)) {
    // エラーがある場合はリダイレクトで戻す
    $query = http_build_query(['error' => implode(' ', $errors)]);
    header('Location: index.html?' . $query);
    exit;
}

// メール送信
$to      = TO_EMAIL;
$subject_mail = '[' . SITE_NAME . '] ' . mb_encode_mimeheader($subject, 'UTF-8', 'B');
$body    = "お名前: {$name}\nメール: {$email}\n\nメッセージ:\n{$message}";
$headers = implode("\r\n", [
    'From: ' . SITE_NAME . ' <noreply@' . ($_SERVER['HTTP_HOST'] ?? 'example.com') . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'MIME-Version: 1.0',
]);

$sent = mail($to, $subject_mail, $body, $headers);

if ($sent) {
    header('Location: index.html?sent=1');
} else {
    header('Location: index.html?error=' . urlencode('送信に失敗しました。しばらくしてから再度お試しください。'));
}
exit;
